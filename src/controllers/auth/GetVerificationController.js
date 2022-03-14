// Import dependencies
const OTP = require('../../models/OTP').OTP;
const SendMail = require('../../utils/SendMail').SendMail;
const FileLogger = require('../../utils/ErrorLogger').FileLogger;

exports.GetVerificationToken = async (req, res) => {
    try {
        const otp = await OTP.create({
            user_id: req.user._id,
        });

        const mail_status = await SendMail(req.user.email, "Account Verification");

        if (mail_status) res.status(200).json({
            data: "Email sent successfully",
            errors: null
        });
        else res.status(500).json({
            data: null,
            message: "Unable to verify user"
        });
    } catch (error) {
        FileLogger.error("Unable to create and send verification token", { error });

        res.status(500).json({
            data: null,
            message: "Unable to verify user"
        })
    }
}
