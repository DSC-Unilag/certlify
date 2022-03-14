// Import dependencies
const nodemailer = require('nodemailer');
const getEnvs = require('./GetEnvs').GetEnvs;
const FileLogger = require('./ErrorLogger').FileLogger;

exports.SendMail = (to, type) => {
    const transporter = nodemailer.createTransport({
        service: "SES",
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 587,
        secure: true,
        auth: {
            user: process.env.SES_USER || getEnvs().NODE_MAILER_USER,
            pass: process.env.SES_PASS || getEnvs().NODE_MAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: "info@certlify.com",
        to: `zubairidrisaweda@gmail.com`, // Todo: fix this
        subject: "Getting started with Certlify!", // Todo: set to be dynamic based on type
        html: `i love love` // Todo: sett to be dynamic based on type
    }

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) FileLogger.error('Unable to send mail', { error });
        else {
            FileLogger.info("Mail sent successfully", { response })
            return true;
        }
    })
}
