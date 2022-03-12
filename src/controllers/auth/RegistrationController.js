const User = require('../../models/User').User;
const { hashSync, genSaltSync } = require('bcrypt');
const createToken = require('../../utils/CreateToken').CreateToken;

exports.Register = async (req, res) => {
    const { first_name, last_name, email, password, password_confirmation } = req.body;
    let required_fields = ['first_name', 'last_name', 'email', 'password', 'password_confirmation'];
    let values = [first_name, last_name, email, password, password_confirmation];

    // Todo: Move Basic validations into function
    if (!first_name || !last_name || !email || !password || !password_confirmation) {
        let message = 'Missing required fields: ';

        required_fields.forEach((field, i) => {
            if (!values[i]) message += field + ', ';
        })

        message = message.substring(0, message.length - 2);
        message += ".";

        res.status(400).json({
            data: null,
            error: message
        });
    } else {
        let user = await User.find({ email });

        if (user) {
            res.status(400).json({
                data: null,
                message: "Email is taken already"
            })
        } else {
            try {
                let user = await User.create({
                    first_name,
                    last_name,
                    email,
                    password: hashSync(password, genSaltSync())
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
