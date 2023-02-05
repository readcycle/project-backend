const bcrypt = require('bcryptjs')

const hashPwd = (pwd)=> {
    return bcrypt.hashSync(pwd)
}

const comparePwd = (pwd, hashed) => {
    return bcrypt.compareSync(pwd, hashed)
}

module.exports = { hashPwd, comparePwd }