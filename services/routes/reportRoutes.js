const router = require("express").Router();
const ReportController = require("../controller/report");
const { authUser } = require("../middlewares/authentication");

//How User can register and Login
// router.post("/users/register", UserController.register); // ! user routes already exist userRoutes.js
// router.post("/users/login", UserController.login);

//How User can report other user
router.post("/:reportedId", authUser, ReportController.addReport);

module.exports = router;
