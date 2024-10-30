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

  static findOrCreateConversation = async ({ customerId, staffId }) => {
    console.log("customer ID:::", customerId);
    const existingConversation = await Conversation.findOne({
      where: {
        customerId: customerId,
        staffId: staffId,
      },
    });

    if (existingConversation) {
      return existingConversation;
    }

    const conversation = await Conversation.create({
      customerID: customerId,
      staffId: staffId || null, // Ensure staffId can be null if not provided
      updatedAt: new Date(),
    });

    if (!conversation) throw new ServerError("Cannot create new conversation");
    return conversation;
  };

  static sendMessage = async ({
    senderType,
    senderId,
    receiverId,
    messageText,
  }) => {
    let conversation;
    if (senderType === "customer") {
      conversation = await Conversation.findOne({
        where: {
          customerId: senderId,
          staffId: { [Op.ne]: null }, // Ensure staffId is not null for existing conversations
        },
      });
    } else {
      // If it's staff, look for any existing conversation they have with the customer
      conversation = await Conversation.findOne({
        where: {
          customerId: receiverId, // Assume receiverId is the customerId in this case
          staffId: senderId,
        },
      });
    }
    // If no conversation found, create a new one
    if (!conversation && senderType === "customer") {
      // This means the customer is sending the first message and no conversation exists
      conversation = await Conversation.create({
        customerId: senderId,
        staffId: null, // First message can't have a staffId yet
        updatedAt: new Date(),
      });
    } else if (!conversation) {
      throw new BadRequestError("No existing conversation found");
    }

    // Ensure that conversation ID and sender ID are not null
    if (!conversation.id)
      throw new BadRequestError("Conversation ID cannot be null");
    if (!senderId) throw new BadRequestError("Sender ID cannot be null");

    // Create the message
    const message = await Message.create({
      conversationID: conversation.id, // Use the ID of the conversation
      senderType,
      senderID: senderId,
      messageText,
      isRead: false,
    });

    if (!message) throw new ServerError("Message is not created!");

    // Update the conversation's last activity timestamp
    await conversation.update({ updatedAt: new Date() });
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
