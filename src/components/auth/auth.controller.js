
const {
    generateResponse,
    createError,
    createSuccessMessage,
  } = require("../../utils/response");



const login=(req,res)=>{
    res.send("login")
}

module.exports.login=login;

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