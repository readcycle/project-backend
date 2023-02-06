const ChatController = require("../controllers/chat");
const router = require("express").Router();

router.get("/", ChatController.find);
router.get("/:id", ChatController.findOne);
router.post("/", ChatController.create);
router.put("/:id", ChatController.update);

module.exports = router;
