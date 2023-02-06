const BookController = require("../controller/book");
const bookRouter = require("express").Router();

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBookById);
bookRouter.post("/", BookController.create);

module.exports = bookRouter;
