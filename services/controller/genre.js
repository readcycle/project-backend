const { Genre } = require('../models')

class GenreController{
    //How Admin can to manipulate data genres (full CRUD)
    static async getGenres(req, res, next){
        try {
            const genres = await Genre.findAll()

            res.status(200).json(genres)
        } catch (error) {
            next(error)
        }
    }

    static async getGenreById(req, res, next){
        try {
            const genre = await Genre.findByPk(req.params.id)
            if(!genre) throw { name: "DataNotFound" }

            res.status(200).json(genre)
        } catch (error) {
            next(error)
        }
    }

    static async addGenre(req, res, next){
        try {
            const { name } = req.body
            const newGenre = await Genre.create({ name })

            res.status(201).json({id: newGenre.id, name: newGenre.name})
        } catch (error) {
            next(error)
        }
    }

    static async updateGenre(req, res, next){
        try {
            const genre = await Genre.findByPk(req.params.id)
            if(!genre) throw { name: "DataNotFound" }

            const { name } = req.body
            await Genre.update({ name }, {where: {id: req.params.id}})

            res.status(200).json({message: `Genre with id ${genre.id} successfully updated`})
        } catch (error) {
            next(error)
        }
    }

    static async deleteGenre(req, res, next){
        try {
            const genre = await Genre.findByPk(req.params.id)
            if(!genre) throw { name: "DataNotFound" }

            await Genre.destroy({where: {id: req.params.id}})
            
            res.status(200).json({message: `Genre with id ${genre.id} successfully deleted`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GenreController