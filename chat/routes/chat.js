const ChatController = require("../controllers/chat");
const router = require("express").Router();

router.get("/:id", ChatController.find);

module.exports = router;
