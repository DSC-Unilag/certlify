// Import modules
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response")
const { User } = require("../../users/users.model")
const { sendAuthError } = require("../../../utils/sendErrors")
const { createToken } = require("../../../utils/token")
const { verifyUser } = require("../../../utils/mail/verifyUser")

exports.register = async function (req, res) {
    let { name, email, password } = req.body

    try {
        const user = await User.create({ name, email: email.toLowerCase(), password })
        if (!user) {
            const result = generateResponse(400, createError({
                message: "Unable to create user",
            }))
            res.status(result.status).json(result.result)
        }
        const token = await createToken(user._id)
        verifyUser(email, name, `https://${ req.hostname }/verify/${ token }`)
        const result = generateResponse(201, createSuccessMessage({ user, token: token.value }))
        res.status(result.status).json(result.result)
    } catch (error) {
        const errors = sendAuthError(error)
        const result = generateResponse(400, createError(errors))
        res.status(result.status).json(result.result)
    }
}
