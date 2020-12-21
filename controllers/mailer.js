const nodemailer = require("nodemailer");
const config = require("../config/database");

var transporter = nodemailer.createTransport({
    service:"SES",
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 587,
    secure: true,
    auth: {
        user: process.env.SES_USER || config.email,
        pass: process.env.SES_PASS || config.emailpass,
    },
});
let sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (err, response) {
        if (err) console.log(err);
    });
}

module.exports=sendMail