// Import dependencies
const express = require('express');

const router = express.Router();

const RegisterController = require('../controllers/auth/RegistrationController').Register;
const LoginController = require('../controllers/auth/LoginController').Login;

router.post('/register', RegisterController);
router.post('/login', LoginController);

module.exports = router;
