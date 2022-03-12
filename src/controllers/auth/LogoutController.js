// Import dependencies
const removeToken = require('../../utils/RemoveToken').RemoveToken;

exports.Logout = (req, res) => {
    const token = req.token;

    const removedToken = removeToken(token);

    if (removedToken) res.status(200).json({
        data: "User logged out successfully",
        errors: null
    });
    else res.status(404).json({
        data: null,
        errors: "User not found"
    });
}
