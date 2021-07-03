// Import modules
const { generateResponse, createError, createSuccessMessage } = require("../../utils/response")
const User = require("../../components/users")
const { sendAuthError } = require("../../utils/sendErrors")

export async function register (req, res) {
    let { name, email, password } = req.body

    try {
        const user = await User.create({ name, email: email.toLowerCase(), password })
        const token = await createToken(user._id)
        const result = generateResponse(201, createSuccessMessage({ user, token: token.value }))
        return res.status(result.status).json(result.result)
    } catch (error) {
        const errors = sendAuthError(error)
        const result = generateResponse(400, createError(errors))
        return res.status(result.status).json(result.errors)
    }
}
