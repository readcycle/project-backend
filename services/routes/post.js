const PostController = require("../controller/post");
const { authUser } = require("../middlewares/authentication");
const upload = require("../middlewares/multer");
const router = require("express").Router();

router.get("/", PostController.find);
router.get("/:id", PostController.findOne);
router.post("/", authUser, upload.single("file"), PostController.create);
// router.put("/:id", PostController.update);
router.patch("/:id", PostController.changeStatus);
router.delete("/:id", PostController.delete);

module.exports = router;
