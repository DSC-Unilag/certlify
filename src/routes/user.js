// Import dependencies
const express = require('express');

const router = express.Router();

const GetDashboard = require('../controllers/user/GetDashboard').GetDashboard;


router.get('/dashboard', GetDashboard);

module.exports = router;