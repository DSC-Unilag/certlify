const express = require('express')
const { register } = require("./controllers/registerController.ctrl")
const { login } = require("./controllers/loginController.ctrl")
const { logout } = require("./controllers/logoutController.ctrl")
const { requireAuth } = require("./middlewares/requireAuth")

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', requireAuth, logout)

module.exports = router
