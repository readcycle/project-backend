const bidRouter = require("./bidRoutes");
const bookRouter = require("./bookRoutes");
const userRouter = require("./userRoutes");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/bids", bidRouter);

module.exports = router;
