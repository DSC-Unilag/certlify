const express = require('express');
const { register } = require("./registerController.ctrl");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/register', register);

module.exports = router;
