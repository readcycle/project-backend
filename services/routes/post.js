const PostController = require("../controllers/post");
const router = require("express").Router();

router.get("/", PostController.find);
router.get("/:id", PostController.findOne);
router.post("/", PostController.create);
router.put("/:id", PostController.update);
router.patch("/:id", PostController.changeStatus);
router.delete("/:id", PostController.delete);

module.exports = router;
