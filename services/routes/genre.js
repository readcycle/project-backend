const router = require('express').Router()
const GenreController = require('../controller/genre')
const { authAdmin } = require("../middlewares/authentication");

router.get("/", authAdmin, GenreController.getGenres);
router.get("/:id", authAdmin, GenreController.getGenreById);

module.exports = router