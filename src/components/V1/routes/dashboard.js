const express = require('express');
const GetDashboard = require('../controllers/GetDashboard');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/getdashboard', GetDashboard);

module.exports = router;