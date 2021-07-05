const { sign, verify } = require('jsonwebtoken')
const { Token } = require('../components/tokens/token.model')
const config = require("../config/configuration")
const secret = process.env.SECRET || config.jwtsecret;

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
exports.validateToken = function (token) {
    verify (token, secret, async (error, decodedToken) => {

        if (error) {
            return false
        } else {

            const storedToken = Token.findOne({ value: token })
            const user = User.findById(decodedToken.id)

            if (storedToken && user) {
                return decodedToken
            } else {
                return false
            }
        }
    })
}

/**
 * Removes a token whenever the user logs out
 * @param {string} token Token from client
 * @returns 
 */
exports.removeToken = async function (token) {
    const removedToken = await Token.deleteOne({ value: token })

    return removedToken;
}
