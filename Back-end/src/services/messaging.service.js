"use strict";

const { Op } = require("sequelize");
const { BadRequestError, ServerError } = require("../core/error.response");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const sequelize = require("../configs/sequelize");

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
    const conversationsWithLatestMessages = await Conversation.findAll({
      where: {
        status: "open",
      },
      include: [
        {
          model: Message,
          attributes: ["id", "messageText", "createdAt"], // Fetch only necessary fields
          limit: 1, // Fetch only the latest message
          order: [["createdAt", "DESC"]], // Ensure it's the latest message
        },
      ],
    });
    return conversationsWithLatestMessages.map((conversation) => {
      const latestMessage = conversation.Messages[0]; // Messages is the included array
      return {
        id: conversation.id,
        customerID: conversation.customerID,
        latestMessage: latestMessage
          ? {
              id: latestMessage.id,
              messageText: latestMessage.messageText,
              createdAt: latestMessage.createdAt,
            }
          : null, // Handle case where no messages exist
      };
    });
  };

  static getConversationWithStaffID = async (staffID) => {
    const conversationsWithLatestMessages = await Conversation.findAll({
      where: { staffID: staffID },
      include: [
        {
          model: Message,
          attributes: ["id", "messageText", "createdAt"], // Fetch only necessary fields
          limit: 1, // Fetch only the latest message
          order: [["createdAt", "DESC"]], // Ensure it's the latest message
        },
      ],
    });

    if (!conversationsWithLatestMessages) {
      throw new Error("No conversations found for the provided staffID.");
    }

    return conversationsWithLatestMessages.map((conversation) => {
      const latestMessage = conversation.Messages[0]; // Messages is the included array
      return {
        id: conversation.id,
        staffID: conversation.staffID,
        customerID: conversation.customerID,
        latestMessage: latestMessage
          ? {
              id: latestMessage.id,
              messageText: latestMessage.messageText,
              createdAt: latestMessage.createdAt,
            }
          : null, // Handle case where no messages exist
      };
    });
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
          where: { customerId: senderID, status: "open" }, // Find open conversation with customer ID
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

    return {
      conversationID: conversation.id,
    };
  };
}

module.exports = MessagingService;
