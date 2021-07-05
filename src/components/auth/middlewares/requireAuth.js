const { verify } = require("jsonwebtoken")
const { sendAuthError } = require("../../../utils/sendErrors")
const { createError, generateResponse } = require("../../../utils/response")
const { validateToken, removeToken } = require("../../../utils/token")

exports.requireAuth =  async function (req, res, next) {
    const token = req.header('token')

    if (token) {
        const decodedToken = validateToken(token)

        if (decodedToken) {
            const user = await User.findById(decodedToken.id)
            req.user = user
            req.token = token
            next()
        } else {
            const result = generateResponse(403, createError({
                message: "Invalid token"
            }))
            return res.status(result.status).json(result.result)
        }
    } else {
        const errors = sendAuthError({}, false, true)
        const result = generateResponse(403, createError(errors))
        return res.status(result.status).json(result.result)
    }
}
