const { sign, verify } = require('jsonwebtoken')
const { Token } = require('../models/token.model')
const { User } = require("../models/users.model")
const getEnvs = require('../utils/getEnv').getEnvs
const secret = getEnvs.JWT_SECRET

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

/**
 * Decrypts a valid JWT Token
 * @param {string} token Token to be tested
 */
exports.validateToken = async function (token) {

    try {
        const verifiedToken = verify (token, secret)

        const storedToken = await Token.findOne({ value: token })
        const user = await User.findById(verifiedToken.id)

        if (storedToken && user) {
            return verifiedToken
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

exports.getValidatedToken = function () {}

/**
 * Removes a token whenever the user logs out
 * @param {string} token Token from client
 * @returns 
 */
exports.removeToken = async function (token) {
    const removedToken = await Token.deleteOne({ value: token })

    return removedToken;
}
