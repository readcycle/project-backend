const router = require("express").Router();
const GenreController = require("../controller/genre");

router.get("/", GenreController.getGenres);
router.get("/:id", GenreController.getGenreById);

module.exports = router;
