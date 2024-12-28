const { CREATED, OK } = require("../core/success.response");
const MessagingService = require("../services/messaging.service");

class MessagingController {
  sendMessage = async (req, res, next) => {
    new CREATED({
      message: "Message sent successfully",
      metadata: await MessagingService.sendMessage(req.body),
    }).send(res);
  };

  getConversation = async (req, res, next) => {
    new CREATED({
      message: "Conversation fetch successfully",
      metadata: await MessagingService.getConversation(req.params.id),
    }).send(res);
  };

  getCustomerCurrentConversationID = async (req, res, next) => {
    new OK({
      message: "Conversation fetch successfully",
      metadata: await MessagingService.getCustomerCurrentConversationID(
        req.params.id
      ),
    }).send(res);
  };

  getOpenConversations = async (req, res, next) => {
    new OK({
      message: "Open conversations fetch successfully",
      metadata: await MessagingService.getOpenConversations(),
    }).send(res);
  };
  getConversationWithStaffID = async (req, res, next) => {
    new OK({
      message: "Conversations fetch successfully",
      metadata: await MessagingService.getConversationWithStaffID(
        req.params.id
      ),
    }).send(res);
  };
}

module.exports = new MessagingController();
