// Import dependencies
const ValidateRequest = require('../../utils/ValidateRequest').ValidateRequest;
const OTP = require('../../models/OTP').OTP;
const User = require('../../models/User').User;
const FileLogger = require('../../utils/ErrorLogger').FileLogger;

exports.VerifyVerificationToken = async (req, res) => {
    const { body, errors } = ValidateRequest(req.body, [
        'token',
    ]);

    if (errors) res.status(400).json({
        data: null,
        errors
    });
    else {
        try {
            const otp = await OTP.findOne({
                value: body.token
            });

            if (!otp) res.status(400).json({
                data: null,
                message: "Invalid token"
            });
            else {
                if (otp.expiry_date < new Date() || otp.user_id != req.user._id) res.status(400).json({
                    data: null,
                    message: "Invalid or Expired token",
                });
                else {
                    const user = await User.updateOne({
                        _id: req.user.id
                    }, { email_verified_at: new Date() });

                    const deletedOtp = await OTP.deleteOne({
                        _id: otp._id,
                    });

                    res.status(200).json({
                        data: "Account verified successfully",
                        errors: null
                    });
                }
            }
        } catch (error) {
            FileLogger.error("Unable to create and send verification token", { error });

            res.status(500).json({
                data: null,
                message: "Unable to verify user"
            })
        }
    }
}
