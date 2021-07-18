const { removeToken } = require("../../../utils/token")
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response")

exports.logout = async function (req, res) {
    const { token } = req

    const removedToken = removeToken(token)

    if (removedToken) {
        const result = generateResponse(200, createSuccessMessage({
            message: "User Logged out successfully"
        }))
        res.status(result.status).json(result.result)
    } else {
        const result = generateResponse(404, createSuccessMessage({
            message: "User Not Found"
        }))
        res.status(result.status).json(result.result)
    }
}
