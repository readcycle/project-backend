const router = require("express").Router();
const chatRouter = require("./chat");

router.get("/", (req, res) => res.json("Hello from Chat API"));
router.use("/chat", chatRouter);

module.exports = router;
