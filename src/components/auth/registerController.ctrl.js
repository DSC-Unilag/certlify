// Import modules
const { generateResponse, createError, createSuccessMessage } = require("../../utils/response");
const User = require("../../components/users");

module.exports.register = async (req, res) => {

    // Invalid or Incomplete input
    if (!req.body.name || !req.body.password || !req.body.email) {
        result = generateResponse(400, createError(err.message));
        return res.status(result.status).json(result.result);
    }
    
    // User Inputs
    const { name, password } = req.body;
    const email = req.body.email.toLowerCase();

    // Invalid password
    if (password.length < 8) {
        res.status(401).json({
            status: false,
            message: "Invalid password"
        })
    }

    // Invalid mail
    const mailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!mailPattern.test(email)) {    
        res.status(401).json({
            status: false,
            message: "Invalid email address"
        })
    }

    // Duplicate user
    const { user, error } = await User.findOne({ email });
    if (error) {
        result = generateResponse(400, createError(err.message));
        return res.status(result.status).json(result.result);
    }
    if (user) {
        res.status(409).json({
            status: false,
            message: "Duplicate user"
        })
    }
}

export async function register (req, res) {
    let { name, email, password } = req.body;
}
