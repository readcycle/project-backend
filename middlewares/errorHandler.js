const errorHandler = (error, req, res, next) => {
    let code = 500
    let message = "Internal server error"

    if(error.name === "SequelizeValidationError") {
        code = 400
        message = error.errors[0].message
    } else if(error.name === "RequiredEmailLogin") {
        code = 400
        message = "Email is required"
    } else if(error.name === "RequiredPasswordLogin") {
        code = 400
        message = "Password is required"
    } else if(error.name === "InvalidToken" || error.name === 'JsonWebTokenError') {
        code = 401
        message = "Invalid token"
    } else if(error.name === "InvalidLogin") {
        code = 401
        message = "Invalid email or password"
    } else if(error.name === "DataNotFound"){
        code = 404
        message = "Data not found"
    } else if(error.name === "Forbidden"){
        code = 403
        message = "You are unauthorized"
    }

    res.status(code).json({message: message})
}

module.exports = { errorHandler }