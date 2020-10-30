const express = require('express');
const generate = require('../controllers/generate');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/name",generate.name);
router.post("/generate/:link",generate.emailverification);
module.exports=router;