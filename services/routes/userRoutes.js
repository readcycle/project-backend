const {
	UserController,
	UserAuthenticationController,
} = require("../controller/user");
const upload = require("../middlewares/multer");
const userRouter = require("express").Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/login", UserAuthenticationController.userLogin);
userRouter.post(
	"/register",
	upload.single("file"),
	UserAuthenticationController.userRegister
);
userRouter.put("/:id", UserController.userEditProfile);

userRouter.patch("/:id", UserController.userIsBannedStatus);

module.exports = userRouter;
