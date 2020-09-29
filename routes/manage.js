const express = require('express');
const manage = require('../controllers/manage');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


module.exports=router;
