const { Book } = require("../models");

class BookController {
  static async getAllBooks(req, res, next) {
    try {
      const data = await Book.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Book.findOne({ where: { id } });
      if (!data) throw { name: "not_found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
