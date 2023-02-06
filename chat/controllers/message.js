const Message = require("../models/message");

class MessageController {
  static async find(req, res, next) {
    const { id } = req.query;
    try {
      if (!id) throw { name: "id_query_required" };
      const messages = await Message.find(id);

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      const message = await Message.findOne(id);

      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const { id, message, chatId } = req.body;
    try {
      const newMessage = await Message.create(id, message, chatId);

      res.status(201).json({ message: "New chat added" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;
