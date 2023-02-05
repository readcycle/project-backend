const router = require("express").Router();
const Administrator = require("../controller/admin");
const GenreController = require("../controller/genre");
const ReportController = require("../controller/report");
// const UserController = require("../controllers/user");
const { authAdmin } = require("../middlewares/authentication");

router.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

//How Admin can register and Login
router.post("/register", Administrator.register);
router.post("/login", Administrator.login);

//How Admin can manipulate data users, like get all user (read) or ban user (update)
// router.get("/users", authAdmin, UserController.getUsers); // ! user routes already exist userRoutes.js
// router.get("/users/:id", authAdmin, UserController.getUserById);
// router.patch("/users/:id", authAdmin, UserController.banUser);

//How Admin can to manipulate data genres (full CRUD)

router.get("/genres", authAdmin, GenreController.getGenres);
router.get("/genres/:id", authAdmin, GenreController.getGenreById);

//How Admin can to manipulate data reports
router.get("/reports", authAdmin, ReportController.getReports);
router.get("/reports/:id", authAdmin, ReportController.getReportById);
router.patch("/reports/:id", authAdmin, ReportController.updateReport);

module.exports = router;
