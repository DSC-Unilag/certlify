const express = require('express');
const generate = require('../controllers/generate');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/details",generate.details);
router.get("/generate",generate.generate);

module.exports=router;