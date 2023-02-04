const router = require('express').Router()
const adminRouter = require('./admin')
const userRouter = require('./user')

router.use('/', adminRouter)
router.use('/', userRouter)

module.exports = router