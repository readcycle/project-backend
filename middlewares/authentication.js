const { Admin, User } = require('../models')
const { decode } = require('../helpers/jwt')

const authAdmin = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) throw {name: "InvalidToken"}

        const payload = decode(access_token)

        const admin = await Admin.findByPk(payload.id)
        if(!admin) throw {name: "InvalidToken"}

        req.admin = { id: admin.id }

        next()
    } catch (error) {
        next(error)
    }
}

const authUser = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) throw {name: "InvalidToken"}

        const payload = decode(access_token)

        const user = await User.findByPk(payload.id)
        if(!user) throw {name: "InvalidToken"}

        req.user = { id: user.id }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authAdmin, authUser }