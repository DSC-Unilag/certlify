const nodemailer = require("nodemailer");
const config = require("../config/database");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || config.email,
        pass: process.env.EMAILPASS || config.emailpass,
    },
});
let sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (err, response) {
        if (err) console.log(err);
    });
}

module.exports=sendMail