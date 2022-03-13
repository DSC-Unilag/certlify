// Import dependencies
const express = require('express');
const RequireAuth = require('../middlewares/RequireAuth').RequireAuth;

const router = express.Router();

const RegisterController = require('../controllers/auth/RegistrationController').Register;
const LoginController = require('../controllers/auth/LoginController').Login;
const LogoutController = require('../controllers/auth/LogoutController').Logout;
const GetVerificationController = require('../controllers/auth/GetVerificationController').GetVerificationToken;
const PostVerificationController = require('../controllers/auth/PostVerificationController').VerifyVerificationToken;

router.post('/register', RegisterController);
router.post('/login', LoginController);
router.get('/logout', RequireAuth, LogoutController);
router.get('/verify', RequireAuth, GetVerificationController);
router.post('/verify', RequireAuth, PostVerificationController);

module.exports = router;
