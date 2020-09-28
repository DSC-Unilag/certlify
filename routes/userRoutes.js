const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/register', UserController.getRegister);
router.post('/register', UserController.register);

router.get('/login', UserController.getLogin);
router.post('/login', UserController.login);

module.exports = router;