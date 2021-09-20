const { compare } = require("bcrypt")
const { User } = require("../../../models/users.model")
const { createToken } = require("../../../utils/token")
const { sendAuthError } = require("../../../utils/sendErrors")
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response")

exports.login =  async function (req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        const result = generateResponse(401, createError({
            message: "Incomplete request"
        }))
        res.status(result.status).json(result.result)
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() })
        
        if (user) {
            const auth = await compare(password, user.password)

            if (auth) {
                const token = await createToken(user._id)
                const result = generateResponse(201, createSuccessMessage({ user, token: token.value }))
                res.status(result.status).json(result.result)
            } else {
                const errors = sendAuthError({}, true)
                const result = generateResponse(401, createError(errors))
                res.status(result.status).json(result.result)
            }
        } else {
            const result = generateResponse(404, createError({
                message: "User Not Found"
            }))
            res.status(result.status).json(result.result)
        }
    } catch (error) {
        const errors = sendAuthError(error)
        const result = generateResponse(401, createError(errors))
            res.status(result.status).json(result.result)
    }
}
