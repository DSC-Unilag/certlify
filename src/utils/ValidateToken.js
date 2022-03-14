// Import dependencies
const verify = require('jsonwebtoken').verify;
const getEnvs = require('./GetEnvs').GetEnvs;
const Token = require('../models/Token').Token;
const User = require('../models/User').User;
const FileLogger = require('../utils/ErrorLogger').FileLogger;

exports.ValidateToken = async (token) => {
    try {
        const verifiedToken = verify(token, getEnvs().JWT_SECRET);

        const storedToken = await Token.findOne({
            value: token
        });
        const user = await User.findById(verifiedToken.id);

        if (storedToken && user) return verifiedToken;
        else return false;
    } catch (error) {
        FileLogger.error("Unable to validate token", { error });
        return false;
    }
}
