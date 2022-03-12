const User = require('../../models/User').User;
const { hashSync, genSaltSync } = require('bcrypt');
const createToken = require('../../utils/CreateToken').CreateToken;
const ValidateRequest = require('../../utils/ValidateRequest').ValidateRequest;

exports.Register = async (req, res) => {
    const { body, errors } = ValidateRequest(req.body, [
        'first_name',
        'last_name',
        'email',
        'password',
        'password_confirmation'
    ]);

    if (errors) {
        res.status(400).json({
            data: null,
            errors
        })
    } else {
        let user = await User.findOne({
            email: body.email
        });

        if (user) {
            res.status(400).json({
                data: null,
                message: "Email is taken already"
            })
        } else {
            try {
                let user = await User.create({
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email,
                    password: hashSync(body.password, genSaltSync())
                });

                if (!user) {
                    res.status(500).json({
                        data: null,
                        message: "Unable to create user"
                    })
                }

                res.status(201).json({
                    data: user,
                    token: await createToken(user._id)
                });

                // Todo: write to file here
            } catch (error) {
                // Todo: write to file here
                console.log(error)

                res.status(500).json({
                    data: null,
                    message: "Unable to create user"
                })
            }
        }
    }
}
