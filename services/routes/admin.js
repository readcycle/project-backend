const router = require("express").Router();
const Administrator = require("../controller/admin");

//How Admin can register and Login
router.post("/register", Administrator.register);
router.post("/login", Administrator.login);

module.exports = router;
