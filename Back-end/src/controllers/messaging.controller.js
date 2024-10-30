const { CREATED } = require("../core/success.response");
const MessagingService = require("../services/messaging.service");

class MessagingController {
  sendMessage = async (req, res, next) => {
    new CREATED({
      message: await MessagingService.sendMessage(req.body),
    }).send(res);
  };

  getConversation = async (req, res, next) => {
    new CREATED({
      message: "Conversation fetch successfully",
      metadata: await MessagingService.getConversation(req.params.id),
    }).send(res);
  };
}

module.exports = new MessagingController();
