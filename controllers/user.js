const { User, Report } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next){
        try {
            const { username, email, password, phoneNumber, city, favoriteGenre, favoriteBook } = req.body
            const newUser = await User.create({ username, email, password, phoneNumber, city, favoriteGenre, favoriteBook })

            res.status(201).json({id: newUser.id, username: newUser.username, email: newUser.email})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const { email, password } = req.body
            if(!email) throw { name: "RequiredEmailLogin" }
            if(!password) throw { name: "RequiredPasswordLogin" }

            const user = await User.findOne({where: {email}})
            if(!user) throw { name: "InvalidLogin" }
            if(user.isBanned === true) throw { name: "Forbidden" }

            const validPwd = comparePwd(password, user.password)
            if(!validPwd) throw { name: "InvalidLogin" }

            res.status(200).json({
                access_token: encode({ id: user.id }),
                username: user.username,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUsers(req, res, next){
        try {
            const users = await User.findAll({attributes: {exclude: ['password']}})

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req, res, next){
        try {
            const user = await User.findByPk(req.params.id, {attributes: {exclude: ['password']}})
            if(!user) throw { name: "DataNotFound" }

            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async banUser(req, res, next){
        try {
            const user = await User.findByPk(req.params.id, {attributes: {exclude: ['password']}})
            if(!user) throw { name: "DataNotFound" }

            await User.update({isBanned: !user.isBanned},{where: {id: req.params.id}})

            res.status(200).json({message: `User with id ${user.id} successfully banned`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController