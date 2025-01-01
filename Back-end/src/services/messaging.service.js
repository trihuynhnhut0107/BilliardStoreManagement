"use strict";

const { Op } = require("sequelize");
const { BadRequestError, ServerError } = require("../core/error.response");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const sequelize = require("../configs/sequelize");
const Customer = require("../models/Customer");

class MessagingService {
  static getConversation = async (conversationID) => {
    const messages = await Message.findAll({
      where: {
        conversationID: conversationID,
      },
    });
    return messages;
  };

  static getCustomerCurrentConversationID = async (customerID) => {
    const foundConversationID = await Conversation.findOne({
      attributes: ["id"],
      where: {
        customerID: customerID,
        status: {
          [Op.or]: ["open", "handling"],
        },
      },
    });
    if (!foundConversationID) {
      return { id: -1 };
    }
    return foundConversationID;
  };

  static getOpenConversations = async () => {
    // Fetch conversations with latest messages where the status is "open"
    const conversationsWithLatestMessages = await Conversation.findAll({
      where: {
        status: "open",
      },
      include: [
        {
          model: Message,
          attributes: ["id", "messageText", "senderType", "createdAt"], // Fetch only necessary fields
          limit: 1, // Fetch only the latest message
          order: [["createdAt", "DESC"]], // Ensure it's the latest message
        },
      ],
    });

    // Map through conversations and fetch customer details
    const results = await Promise.all(
      conversationsWithLatestMessages.map(async (conversation) => {
        const latestMessage = conversation.Messages[0]; // Get the latest message
        const foundCustomer = await Customer.findOne({
          where: { id: conversation.customerID },
        });

        return {
          id: conversation.id,
          customerName: foundCustomer ? foundCustomer.name : "Unknown", // Handle missing customer
          latestMessage: latestMessage
            ? {
                id: latestMessage.id,
                messageText: latestMessage.messageText,
                senderType: latestMessage.senderType,
                createdAt: latestMessage.createdAt,
              }
            : null, // Handle case where no messages exist
        };
      })
    );

    return results;
  };

  static getConversationWithStaffID = async (staffID) => {
    // Fetch conversations with latest messages
    const conversationsWithLatestMessages = await Conversation.findAll({
      where: { staffID },
      include: [
        {
          model: Message,
          attributes: ["id", "messageText", "senderType", "createdAt"], // Fetch only necessary fields
          limit: 1, // Fetch only the latest message
          order: [["createdAt", "DESC"]], // Ensure it's the latest message
        },
      ],
    });

    // If no conversations found, return an empty array
    if (
      !conversationsWithLatestMessages ||
      conversationsWithLatestMessages.length === 0
    ) {
      return []; // Return empty array instead of throwing an error
    }

    // Map through conversations and resolve asynchronous operations
    const results = await Promise.all(
      conversationsWithLatestMessages.map(async (conversation) => {
        const latestMessage = conversation.Messages[0]; // Get the latest message
        const foundCustomer = await Customer.findOne({
          where: { id: conversation.customerID },
        });

        return {
          id: conversation.id,
          staffID: conversation.staffID,
          customerName: foundCustomer ? foundCustomer.name : "Unknown", // Handle missing customer
          latestMessage: latestMessage
            ? {
                id: latestMessage.id,
                messageText: latestMessage.messageText,
                senderType: latestMessage.senderType,
                createdAt: latestMessage.createdAt,
              }
            : null, // Handle case where no messages exist
        };
      })
    );

    return results;
  };

  // Function to find or create a conversation
  static findOrCreateConversation = async ({
    senderType,
    senderID,
    conversationID,
  }) => {
    if (senderType === "customer") {
      const conversation =
        (await Conversation.findOne({
          where: {
            customerId: senderID,
            status: {
              [Op.or]: ["open", "handling"], // Check for both open or handling statuses
            },
          }, // Find open conversation with customer ID
        })) ||
        (await Conversation.create({
          // Create a new conversation if none exists
          customerID: senderID,
          staffID: null,
          updatedAt: new Date(),
        }));
      return conversation;
    }

    const conversation = await Conversation.findOne({
      where: { id: conversationID },
    });

    if (conversation && !conversation.staffID) {
      await conversation.update({
        staffID: senderID,
        status: "handling",
        updatedAt: new Date(),
      });
    } else if (!conversation) {
      throw new BadRequestError("No existing conversation found");
    }

    return conversation;
  };

  // Function to send a message
  static sendMessage = async ({
    senderType,
    senderID,
    conversationID,
    messageText,
  }) => {
    if (!senderID) throw new BadRequestError("Sender ID cannot be null");

    const conversation = conversationID
      ? await Conversation.findOne({ where: { id: conversationID } })
      : await this.findOrCreateConversation({
          senderType,
          senderID,
          conversationID,
        });

    if (!conversation)
      throw new BadRequestError("Conversation not found or created");
    if (conversation.status === "open" && senderType === "staff") {
      conversation.update({ status: "handling", staffID: senderID });
    }
    const message = await Message.create({
      conversationID: conversation.id,
      senderType,
      senderID,
      messageText,
      isRead: false,
    });
    if (!message) throw new ServerError("Message not created");

    await conversation.update({ updatedAt: new Date() });

    global.io.to(`conversation_${conversation.id}`).emit("newMessage", {
      conversationID: conversation.id,
      senderType,
      senderID,
      messageText,
      createdAt: message.createdAt,
      isRead: false,
    });
    global.io.emit("update-message-list", {});

    return {
      conversationID: conversation.id,
    };
  };
}

module.exports = MessagingService;
