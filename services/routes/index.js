const express = require("express");
const router = express.Router();
const postRouter = require("./post");

router.get("/", (req, res, next) => res.status(200).json({ message: "hallo" }));
router.use("/posts", postRouter);

module.exports = router;
