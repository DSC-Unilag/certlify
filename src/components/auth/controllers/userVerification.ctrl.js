// Import modules
const { User } = require("../../users/users.model")
const { createToken } = require("../../../utils/token")
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response");
const mailer = require("../../../utils/mail/mailer");
let emailverify = require("../../../utils/mail/UserVerificationMail");

exports.userVerification = async (req, res) => {
  let email = req.body.email;
  try {
    let user = await User.findOne({ email: email }).exec();
    if (user) {
      const token = await createToken(user._id)
      let mailOptions = {
        from: "info@certlify.com", // sender address
        to: `${email}`, // list of receivers
        subject: "Getting started with Certlify!", // Subject line
        html: emailverify(`https://${req.hostname}/verify/${token}`), // html body
      };
      mailer(mailOptions);
      const result = generateResponse(200, createSuccessMessage({
        message:"Verification mail sent successfully"
      }));
      return res.status(result.status).json(result.result)
    }else{
      const result = generateResponse(404, createError("User not found"));
      return res.status(result.status).json(result.result)
    }
  } catch (error) {
    const result = generateResponse(401,error.message);
    return res.status(result.status).json(result.result);
  }
};