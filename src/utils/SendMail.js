// Import dependencies
const nodemailer = require('nodemailer');
const getEnvs = require('./GetEnvs').GetEnvs;

exports.SendMail = (to, type) => {
    const transporter = nodemailer.createTransport({
        service: "SES",
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 587,
        secure: true,
        auth: {
            user: process.env.SES_USER || getEnvs().NODE_MAILER_EMAIL,
            pass: process.env.SES_PASS || getEnvs().NODE_MAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: "info@certlify.com",
        to: `${ to }`,
        subject: "Getting started with Certlify!", // Todo: set to be dynamic based on type
        html: verifyUserTemplate(username, link) // Todo: sett to be dynamic based on type
    }

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) console.log(err) // Todo: write to file here
    })
}
