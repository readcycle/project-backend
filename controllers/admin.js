const { Admin, Report, User } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class Administrator {
    
    static async register(req, res, next){
        try {
            const { email, password } = req.body
            const newAdmin = await Admin.create({ email, password })

            res.status(201).json({id: newAdmin.id, email: newAdmin.email})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const { email, password } = req.body
            if(!email) throw { name: "RequiredEmailLogin" }
            if(!password) throw { name: "RequiredPasswordLogin" }

            const admin = await Admin.findOne({where: {email}})
            if(!admin) throw { name: "InvalidLogin" }

            const validPwd = comparePwd(password, admin.password)
            if(!validPwd) throw { name: "InvalidLogin" }

            res.status(200).json({
                access_token: encode({ id: admin.id }),
                email: admin.email
            })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = Administrator