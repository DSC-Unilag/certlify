const nodemailer = require("nodemailer");
const config = require("../config/database");
var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.EMAIL || config.email,
        pass: process.env.PASSWORD || config.emailpass,
    },
});
let sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (err, response) {
        if (err) console.log(err);
    });
}

module.exports=sendMail