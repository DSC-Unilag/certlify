const sign = require('jsonwebtoken').sign;
const getEnvs = require('./GetEnvs').GetEnvs;
const Token = require('../models/Token').Token;
const FileLogger = require('../utils/ErrorLogger').FileLogger;

exports.CreateToken = async (id) => {
    const maxAge = 3 * 24 * 60 * 60;

    const token = sign({ id }, getEnvs().JWT_SECRET, {
        expiresIn: maxAge
    });

    try {
        const storedToken = await Token.create({
            value: token
        });

        return token;
    } catch (error) {
        FileLogger.error("Unable to create token", { error })
    }
}
