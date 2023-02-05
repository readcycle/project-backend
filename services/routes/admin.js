const router = require('express').Router()
const Administrator =  require('../controllers/admin')
const UserController = require('../controllers/user')
const GenreController = require('../controllers/genre')
const ReportController = require('../controllers/report')
const { authAdmin } = require('../middlewares/authentication')

//How Admin can register and Login
router.post('/admin/register', Administrator.register)
router.post('/admin/login', Administrator.login)

//How Admin can manipulate data users, like get all user (read) or ban user (update)
router.get('/users', authAdmin, UserController.getUsers)
router.get('/users/:id', authAdmin, UserController.getUserById)
router.patch('/users/:id', authAdmin, UserController.banUser)

//How Admin can to manipulate data genres (full CRUD)
router.get('/genres', authAdmin, GenreController.getGenres)
router.get('/genres/:id', authAdmin, GenreController.getGenreById)
router.post('/genres', authAdmin, GenreController.addGenre)
router.put('/genres/:id', authAdmin, GenreController.updateGenre)
router.delete('/genres/:id', authAdmin, GenreController.deleteGenre)

//How Admin can to manipulate data reports
router.get('/reports', authAdmin, ReportController.getReports)
router.get('/reports/:id', authAdmin, ReportController.getReportById)
router.patch('/reports/:id', authAdmin, ReportController.updateReport)

module.exports = router