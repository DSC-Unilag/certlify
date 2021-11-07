const { User } = require("../../users/users.model")
const { createToken } = require("../../../utils/token")
let passwordreset = require("../../../utils/mail/PasswordResetMail");
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response");
const mailer = require("../../../utils/mail/mailer");

exports.emailRecovery = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      const token = await createToken(user._id)
      let mailOptions = {
        from: "info@certlify.com", // sender address
        to: `${email}`, // list of receivers
        subject: "Reset Your Password!", // Subject line
        html: passwordreset(`https://${req.hostname}/passwordupdate/?jwt=${token}`), // html body
      };
      mailer(mailOptions);

      const result = generateResponse(200, createSuccessMessage({
        message: "email sent successfully"
      }));
      return res.status(result.status).json(result.result)
    } else {
      const result = generateResponse(404, createError("User not found"));
      return res.status(result.status).json(result.result)
    }
  } catch (error) {
    const result = generateResponse(401, error.message)
    return res.status(result.status).json(result.result)
  }

}