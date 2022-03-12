// Import dependencies
const express = require('express');
const RequireAuth = require('../middlewares/RequireAuth').RequireAuth;

const router = express.Router();

const RegisterController = require('../controllers/auth/RegistrationController').Register;
const LoginController = require('../controllers/auth/LoginController').Login;
const LogoutController = require('../controllers/auth/LogoutController').Logout;

router.post('/register', RegisterController);
router.post('/login', LoginController);
router.get('/logout', RequireAuth, LogoutController);

module.exports = router;
