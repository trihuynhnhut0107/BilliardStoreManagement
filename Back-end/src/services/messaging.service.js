"use strict";

const { Op } = require("sequelize");
const { BadRequestError, ServerError } = require("../core/error.response");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

class MessagingService {
  static getConversation = async (conversationID) => {
    const messages = await Message.findAll({
      where: {
        conversationID: conversationID,
      },
    });
    return messages;
  };

  // Function to find or create a conversation
  static findOrCreateConversation = async ({
    senderType,
    senderId,
    receiverId,
  }) => {
    let conversation;

    if (senderType === "customer") {
      // Find an existing conversation where the customer is the sender and staff is assigned
      conversation = await Conversation.findOne({
        where: {
          customerId: senderId,
          staffId: { [Op.ne]: null }, // Staff must be assigned
        },
      });

      // If no conversation is found, create a new one for the customer
      if (!conversation) {
        conversation = await Conversation.create({
          customerID: senderId,
          staffID: null, // No staff assigned initially
          updatedAt: new Date(),
        });
      }
    } else {
      // If sender is staff, look for a conversation with the specified customer
      conversation = await Conversation.findOne({
        where: {
          customerID: receiverId, // Assume receiverId is customerId
        },
      });

      // If conversation exists but has null staffId, update it with sender's staffId
      if (conversation && !conversation.staffID) {
        await conversation.update({ staffId: senderId, updatedAt: new Date() });
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
    senderId,
    receiverId,
    messageText,
  }) => {
    // Find or create a conversation
    const conversation = await this.findOrCreateConversation({
      senderType,
      senderId,
      receiverId,
    });

    // Ensure that conversation ID and sender ID are valid
    if (!conversation.id)
      throw new BadRequestError("Conversation ID cannot be null");
    if (!senderId) throw new BadRequestError("Sender ID cannot be null");

    // Create the message
    const message = await Message.create({
      conversationID: conversation.id,
      senderType,
      senderID: senderId,
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
      senderID: senderId,
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
