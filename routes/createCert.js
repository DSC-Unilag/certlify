const express = require('express');
const createCert = require('../controllers/createCert');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/createcert",createCert);

module.exports=router;

