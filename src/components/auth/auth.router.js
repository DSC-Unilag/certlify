const express = require('express');
const auth=require("./auth.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/login',auth.login);

module.exports=router;