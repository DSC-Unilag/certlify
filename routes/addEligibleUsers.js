const express = require('express');
const UserController = require('../controllers/addEligibleUsers');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/addeligibleusers', addEligibleUsers.addNew);

module.exports = router;
