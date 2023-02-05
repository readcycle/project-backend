class BookController {
  static getAllBooks(req, res, next) {
    res.status(200).json({ message: "Success get all books" });
  }

  static getBookById(req, res, next) {
    const { bookId } = req.params;
    res.status(200).json({ message: `Success get book with id : ${bookId}` });
  }
}

module.exports = BookController;
