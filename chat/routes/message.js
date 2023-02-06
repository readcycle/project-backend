const MessageController = require("../controllers/message");

const router = require("express").Router();

router.get("/", MessageController.find);
router.get("/:id", MessageController.findOne);
router.post("/", MessageController.create);

module.exports = router;
