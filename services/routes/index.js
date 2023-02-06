const router = require("express").Router();
const bidRouter = require("./bidRoutes");
const bookRouter = require("./bookRoutes");
const userRouter = require("./userRoutes");
// const reportRouter = require("./reportRoutes");
const postRouter = require("./post");
const adminRouter = require("./admin");
const reportRouter = require("./report");
const genreRouter = require("./genre");

router.use("/admins", adminRouter);
router.use("/genres", genreRouter);
router.use("/reports", reportRouter);
router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/bids", bidRouter);
router.use("/posts", postRouter);

module.exports = router;
