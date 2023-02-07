const { Genre } = require("../models");

class GenreController {
  static async getGenres(req, res, next) {
    try {
      const genres = await Genre.findAll();

      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  static async getGenreById(req, res, next) {
    try {
      const genre = await Genre.findByPk(req.params.id);
      if (!genre) throw { name: "genre_not_found" };
      
      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;
