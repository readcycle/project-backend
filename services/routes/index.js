const router = require("express").Router();
const bidRouter = require("./bidRoutes");
const bookRouter = require("./bookRoutes");
const userRouter = require("./userRoutes");
const postRouter = require("./post");

router.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/bids", bidRouter);
router.use("/posts", postRouter);

module.exports = router;
