const { removeToken } = require("../../../utils/token")

exports.logout = async function (req, res) {
    const { token } = req

    const removedToken = removeToken(token)

    const reult
}
