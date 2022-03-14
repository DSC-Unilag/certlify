const ValidateRequest = require('../../utils/ValidateRequest').ValidateRequest;
const User = require('../../models/User').User;
const compare = require('bcrypt').compare;
const createToken = require('../../utils/CreateToken').CreateToken;
const FileLogger = require('../../utils/ErrorLogger').FileLogger;

exports.Login = async (req, res) => {
    const { body, errors } = ValidateRequest(req.body, [
        'email',
        'password'
    ]);

    if (errors) res.status(400).json({
        data: null,
        errors
    });
    else {
        try {
            const user = await User.findOne({
                email: body.email
            })

            if (!user) res.status(400).json({
                data: null,
                message: "Incorrect email or password"
            });
            else {
                if (compare(body.password, user.password)) res.status(200).json({
                    data: user,
                    token: await createToken(user._id)
                });
                else res.status(400).json({
                    data: null,
                    message: "Incorrect email or password"
                });
            }
        } catch (error) {
            FileLogger.error("Unable to login user", { error });

            res.status(500).json({
                data: null,
                message: "Unable to login user"
            })
        }
    }
}
