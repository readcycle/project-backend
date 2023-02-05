const router = require("express").Router();
const bidRouter = require("./bidRoutes");
const bookRouter = require("./bookRoutes");
const userRouter = require("./userRoutes");
const reportRouter = require("./reportRoutes");
const postRouter = require("./post");
const adminRouter = require("./admin");

router.use("/", adminRouter); // ! Wrong type
// router.use('/admins')
// router.use('/genres')
// router.use('/reports')
router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/bids", bidRouter);
router.use("/posts", postRouter);
router.use("/reports", reportRouter);

module.exports = router;
