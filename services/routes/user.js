const router = require('express').Router()
const UserController = require('../controllers/user')
const ReportController = require('../controllers/report')
const { authUser } = require('../middlewares/authentication')


//How User can register and Login
router.post('/users/register', UserController.register)
router.post('/users/login', UserController.login)

//How User can report other user
router.post('/reports/:reportedId', authUser, ReportController.addReport)

module.exports = router