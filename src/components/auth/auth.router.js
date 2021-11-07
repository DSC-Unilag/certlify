const express = require('express')
const { register } = require("./controllers/registerController.ctrl")
const { login } = require("./controllers/loginController.ctrl")
const { logout } = require("./controllers/logoutController.ctrl")
const { requireAuth } = require("./middlewares/requireAuth")
const { userVerification } = require('./controllers/userVerification.ctrl')
const { emailRecovery } = require('./controllers/emailRecovery.ctrl')
const { passwordReset } = require('./controllers/passwordReset.ctrl')

const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post('/register', register)
router.post('/login', login)
router.get('/logout', requireAuth, logout)
router.post('/userverification',userVerification)
router.post('/emailrecovery',emailRecovery)
router.post('/passwordReset',passwordReset)

module.exports = router
