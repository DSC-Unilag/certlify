// Import dependencies
const express = require('express');

const router = express.Router();

const RegisterController = require('../controllers/auth/RegistrationController').Register;
const LoginController = require('../controllers/auth/LoginController').Register;

router.post('/register', RegisterController);
router.post('/login', RegisterController);

module.exports = router;
