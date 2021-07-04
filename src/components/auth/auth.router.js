const express = require('express')
const { register } = require("./controllers/registerController.ctrl")
const { login } = require("./controllers/loginController.ctrl")

const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post('/register', register)
router.post('/login', login)

module.exports = router
