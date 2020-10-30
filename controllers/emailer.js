const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false, // true for 465, false for other ports
  auth: {
 //   user: "", // generated ethereal user
 //   pass: "", // generated ethereal password
  },
});


module.exports.transporter = transporter;
