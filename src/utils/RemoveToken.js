// Import dependencies
const Token = require('../models/Token').Token;

exports.RemoveToken = async (token) => {
    const removedToken = await Token.deleteOne({
        value: token
    })

    return removedToken;
}
