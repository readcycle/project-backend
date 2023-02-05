const Chat = require("../models/chat");

class ChatController {
  static async find(req, res, next) {
    const { id } = req.params;
    try {
      const chats = await Chat.find(id);

      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      const chat = await Chat.findOne(id);

      res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const { id, id2 } = req.body;
    try {
      const newChat = await Chat.create(id, id2);

      res.status(201).json(newChat);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const { latestMsg } = req.body;
    try {
      await Chat.update(latestMsg);

      res.status(200).json({ message: "Chat updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ChatController;
