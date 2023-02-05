const jwt = require('jsonwebtoken')

const encode = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY)
}

const decode = (token) => {
    return jwt.verify(token, process.env.JWT_KEY)
}

module.exports = { encode, decode }