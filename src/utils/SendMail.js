// Import dependencies
const nodemailer = require('nodemailer');
const getEnvs = require('./GetEnvs').GetEnvs;
const FileLogger = require('./ErrorLogger').FileLogger;

const EMAIL_TYPES = [
    "Account Verification",
];

exports.SendMail = (to, type) => {
    const from = "Certlify";
    let subject, html;

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

    switch (type) {
        case EMAIL_TYPES[0]:
            subject = "Getting started with Certlify!"; // Todo: set to be dynamic based on type
            html = 'I love you'; // Todo: sett to be dynamic based on type

            break;
        default:
            FileLogger.error('Invalid mail type', { error });
            throw new Error('Invalid mail type');
            break;
    }

    const mailOptions = {
        from: `${ from }`,
        to: `${ to }`,
        subject,
        html
    }

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) FileLogger.error('Unable to send mail', { error });
        else {
            FileLogger.info("Mail sent successfully", { response })
            return true;
        }
    })
}
