const router = require("express").Router();
const chatRouter = require("./chat");
const messageRouter = require("./message");

router.get("/", (req, res) => res.json("Hello from Chat API"));
router.use("/chats", chatRouter);
router.use("/messages", messageRouter);

module.exports = router;
