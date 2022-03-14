// Import dependencies
const Token = require('../models/Token').Token;
const FileLogger = require('../utils/ErrorLogger').FileLogger;

exports.RemoveToken = async (token) => {
    try {
        const removedToken = await Token.deleteOne({
            value: token
        })

        return removedToken;
    } catch (error) {
        FileLogger.error("Unable to remove token", { error });
    }
}
