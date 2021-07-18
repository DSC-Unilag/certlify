const express = require('express');
const addEligibleUsers = require('../controllers/addEligibleUsers');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/addeligibleusers/:link', addEligibleUsers.addNew);

module.exports = router;
