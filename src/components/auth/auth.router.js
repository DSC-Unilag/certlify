const express = require('express');
const auth=require("./auth.controller");

const {
    generateResponse,
    createError,
    createSuccessMessage,
  } = require("../../utils/response");


const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/login',auth.login);

module.exports=router;

// using the response utils, error
/*
result = generateResponse(400, createError(err.message));
    return res.status(result.status).json(result.result);
*/

// using the response utils, success
/*
result = generateResponse(200, createSuccessMessage({ token, user }));
    return res.status(result.status).json(result.result);
*/