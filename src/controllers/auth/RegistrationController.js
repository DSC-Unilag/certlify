const User = require('../../models/User').User;
const { hashSync, genSaltSync } = require('bcrypt');

exports.Register = async (req, res) => {
    const { first_name, last_name, email, password, password_confirmation } = req.body;
    let required_fields = ['first_name', 'last_name', 'email', 'password', 'password_confirmation'];
    let values = [first_name, last_name, email, password, password_confirmation];
    let message = 'Hello there';

    // Todo: Move Basic validations into function
    if (!first_name || !last_name || !email || !password || !password_confirmation) {
        message = 'Missing required fields: ';

        required_fields.forEach((field, i) => {
            if (!values[i]) message += field + ', ';
        })

        message = message.substring(0, message.length - 2);
        message += ".";

        res.status(400).json({
            data: null,
            error: message
        });
    }

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

        // Todo: write to file here
    } catch (error) {
        // Todo: write to file here
    }

    res.status(200).json({ first_name, last_name, email, password, password_confirmation });
}
