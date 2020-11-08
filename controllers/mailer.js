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
        else {
            console.log("email sent")
        }
    });
}

module.exports=sendMail

// let mailOptions = {
//     from: "info@certlify.com", // sender address
//     to: `${email}`, // list of receivers
//     subject: "generationlink", // Subject line
//     text: `generate your certificate at: ${req.hostname}/verify/${token}`, // plain text body
//     html: `<h3>generate your certificate at: </h3> <a href="${req.hostname}/verify/${token}">${req.hostname}/verify/${token}</a>`, // html body
// };