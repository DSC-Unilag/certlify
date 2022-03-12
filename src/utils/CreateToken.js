const sign = require('jsonwebtoken').sign;
const getEnvs = require('./GetEnvs').GetEnvs;
const Token = require('../models/Token').Token;

exports.CreateToken = async (id) => {
    const maxAge = 3 * 24 * 60 * 60;

    const token = sign({ id }, getEnvs().JWT_SECRET, {
        expiresIn: maxAge
    });

    const storedToken = await Token.create({
        value: token
    });

    return token;
}
