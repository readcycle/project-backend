const { Book } = require("../models");

class BookController {
  static async getAllBooks(req, res, next) {
    try {
      const books = await Book.findAll();

      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req, res, next) {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(+id);
      if (!book) throw { name: "book_not_found" };

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const { title, author, GenreId } = req.body;
    try {
      const newBook = await Book.create({ title, author, GenreId });

      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
