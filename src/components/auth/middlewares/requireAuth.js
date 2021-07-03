const { verify } = require("jsonwebtoken")
const secret = process.env.SECRET || config.secret
const { sendAuthError } = require("../../../utils/sendErrors")
const { createSuccessMessage, createError, generateResponse } = require("../../../utils/response")

export function requireAuth (req, res, next) {
    const token = req.header('token')

    if (token) {
        verify(token, secret, async (error, decodedToken) => {
            
            if (error) {
                const errors = sendAuthError({}, false, true)
                const result = generateResponse(403, createError(errors))
                return res.status(result.status).json(result.result)
            } else {
                const user = await User.findById(decodedToken.id)
                req.user = user
                next()
            }
        })
    } else {
        const errors = sendAuthError({}, false, true)
        const result = generateResponse(403, createError(errors))
        return res.status(result.status).json(result.result)
    }
}