// Import dependencies
const ValidateToken = require('../utils/ValidateToken').ValidateToken;
const User = require('../models/User').User;

exports.RequireAuth = async (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) res.status(401).json({
        data: null,
        errors: "Please login to continue."
    }) ;
    else {
        token = token.split(' ')[1];

        const decodedToken = await ValidateToken(token);

        if (!decodedToken) res.status(403).json({
            data: null,
            errors: "Invalid token"
        });
        else {
            const user = User.findById(decodedToken.id);

            req.user = user;
            req.token = token;

            next();
        }
    }
}
