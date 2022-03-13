// Import dependencies
const OTP = require('../../models/OTP').OTP;
const SendMail = require('../../utils/SendMail').SendMail;

exports.GetVerificationToken = async (req, res) => {
    try {
        const otp = await OTP.create({
            user_id: req.user._id,
        });

        // Todo: send mail here
        SendMail(req.user.email, "Account Verification");

        res.status(200).json({
            data: "Email sent successfully",
            errors: null
        });
    } catch (error) {
        // Todo: Write error to file
        console.log(error)

        res.status(500).json({
            data: null,
            message: "Unable to verify user"
        })
    }
}
