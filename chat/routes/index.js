const router = require("express").Router();

router.get("/", (req, res) => res.json("Hello from Chat API"));

module.exports = router;
