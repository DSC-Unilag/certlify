// Import dependencies
const express = require('express');

const router = express.Router();

const RegisterController = require('../controllers/auth/RegistrationController').Register;

router.post('/register', RegisterController);

module.exports = router;
