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
    receiverID,
    conversationID,
  }) => {
    let conversation;

    if (senderType === "customer") {
      // Find an existing conversation where the customer is the sender and staff is assigned
      conversation = await Conversation.findOne({
        where: {
          customerId: senderID,
          status: "open",
        },
      });

      // If no conversation is found, create a new one for the customer
      if (!conversation) {
        conversation = await Conversation.create({
          customerID: senderID,
          staffID: null, // No staff assigned initially
          updatedAt: new Date(),
        });
      }
    } else {
      // If sender is staff, look for a conversation with the specified customer
      conversation = await Conversation.findOne({
        where: {
          id: conversationID, // Assume receiverID is customerId
        },
      });

      // If conversation exists but has null staffId, update it with sender's staffId
      if (conversation && !conversation.staffID) {
        await conversation.update({
          staffID: senderID,
          status: "handling",
          updatedAt: new Date(),
        });
      }
    }

    // If no conversation exists and sender is not a customer, throw an error
    if (!conversation && senderType !== "customer") {
      throw new BadRequestError("No existing conversation found");
    }

    return conversation;
  };

  // Function to send a message
  static sendMessage = async ({
    senderType,
    senderID,
    receiverID,
    conversationID,
    messageText,
  }) => {
    if (!senderID) throw new BadRequestError("Sender ID cannot be null");
    // Find or create a conversation
    const conversation = await this.findOrCreateConversation({
      senderType,
      senderID,
      receiverID,
      conversationID,
    });

    // Ensure that conversation ID and sender ID are valid
    if (!conversation.id)
      throw new BadRequestError("Conversation ID cannot be null");

    // Create the message
    const message = await Message.create({
      conversationID: conversation.id,
      senderType,
      senderID: senderID,
      messageText,
      isRead: false,
    });

    if (!message) throw new ServerError("Message is not created!");

    // Update the conversation's last activity timestamp
    await conversation.update({ updatedAt: new Date() });

    // Emit the new message to the conversation's room via Socket.IO
    const newMessageData = {
      conversationID: conversation.id,
      senderType: senderType,
      senderID: senderID,
      messageText,
      createdAt: message.createdAt,
      isRead: false,
    };

    global.io
      .to(`conversation_${conversation.id}`)
      .emit("newMessage", newMessageData);

    return "Message sent successfully";
  };
}

module.exports = MessagingService;
