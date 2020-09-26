const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get('/register', UserController.register);
router.get('/login', UserController.login);

module.exports = router;