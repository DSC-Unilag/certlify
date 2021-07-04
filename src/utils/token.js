const { sign } = require('jsonwebtoken')
const { Token } = require('../components/tokens/token.model')
const config = require("../config/configuration")
const secret = process.env.SECRET || config.secret;

const maxAge = 3 * 24 * 60 * 60;

/**
 * Creates JWT Token
 * @param id user._id
 * @returns 
 */
exports.createToken = async function (id) {
    const token = sign({ id }, secret, {
        expiresIn: maxAge
    });

    const storedToken = await Token.create({ value: token });

    return storedToken;
}