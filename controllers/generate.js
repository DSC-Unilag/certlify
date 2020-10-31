const Link = require("../models/links");
const nodemailer = require("nodemailer");
const config = require("../config/database");
var jwt = require("jsonwebtoken");
let secret = process.env.DATABASE || config.secret;

let name = (req, res) => {
  let link = req.session.link;
  Link.findOne({ link: link }, (err, cert) => {
    if (cert) {
      res.status(200);
      return res.json({
        status: true,
        data: {
          name: cert.name,
          link: cert.link,
        },
      });
    } else {
      res.status(400);
      res.json({
        status: false,
        message: "invalid certificate link",
      });
    }
  });
};

let details = (req, res) => {
  let link = req.session.link;
  let email = req.session.generator;
  Link.findOne({ link: link }, (err, cert) => {
    if (cert) {
      for (i in cert.eligibleUsers) {
        if (cert.eligibleUsers[i].email == email) {
          if (cert.eligibleUsers[i].status) {
            res.status(200);
            return res.json({
              status: true,
              data: {
                title: cert.name,
                link: cert.link,
                src: cert.src,
                boundary: cert.boundary,
                generated: true,
                name:cert.eligibleUsers[i].name
              },
            });
          }else{
            res.status(200);
            return res.json({
              status: true,
              data: {
                title: cert.name,
                link: cert.link,
                src:cert.src,
                boundary:cert.boundary,
                generated:false
              },
            });
          }
        }
      }
    } else {
      res.status(400);
      res.json({
        status: false,
        message: "invalid certificate link",
      });
    }
  });
};

// emailverification before access to generate certificate
let emailverification = (req, res) => {
  let link = req.params.link;
  let email = req.body.email;
  let chosen;
  //console.log(email)
  //console.log(link);
  Link.findOne({ link: link }, (err, cert) => {
    if (cert) {
      for (i in cert.eligibleUsers) {
        if (cert.eligibleUsers[i].email == email) {
          console.log("email verified");
          chosen = cert.eligibleUsers[i];
          console.log(chosen);
          break;
        }
      }
      if (chosen) {
        if (!chosen.status) {
          jwt.sign({ email, link }, secret, function (err, token) {
            console.log("token generatex for", email);
            let mailOptions = {
              from: "akinwandeakinboluwarin@gmail.com", // sender address
              to: `${email}`, // list of receivers
              subject: "generationlink", // Subject line
              text: `generate your certificate at: ${req.hostname}/certify/${token}`, // plain text body
              html: `<h3>generate your certificate at: </h3> <a href="${req.hostname}/certify/${token}">${req.hostname}/certify/${token}</a>`, // html body
            };
            var transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: "fakeemail@gmail.com",
                pass: "fakepassword",
              },
            });

            transporter.sendMail(mailOptions, function (err, response) {
              if (err) console.log(err);
              else {
                res.status(200);
                return res.json({
                  status: true,
                  message: "email sent",
                });
              }
            });
          });
        } else {
          res.status(409);
          return res.json({
            status: false,
            message: "generated",
          });
        }
      } else if (!chosen) {
        res.status(400);
        return res.json({
          status: false,
          message: "inneligible",
        });
      }
    } else {
      res.status(400);
      res.json({
        status: false,
        message: "invalid certificate link",
      });
    }
  });
};

let generate = (req, res) => {
  let link = req.session.link;
  let email=req.session.generator;
  let chosen;
  console.log(link,email)
    if (req.body.name !== "") {
      Link.findOne({ link: link }, (err, cert) => {
        if (cert) {
          for (i in cert.eligibleUsers) {
            if (cert.eligibleUsers[i].email == email) {
              chosen = i
              break;
            }
          }if(chosen){
            if (!cert.eligibleUsers[chosen].status) {
              cert.eligibleUsers[chosen].name = req.body.name;
              cert.eligibleUsers[chosen].status=true;
              cert.save((err) => {
                if (err) throw err;
                else {
                  res.status(200);
                  return res.json({
                    status: true,
                    message: "generate",
                  });
                }
              });
            } else {
              res.status(409);
              return res.json({
                status: false,
                message: "generated",
              });
            }
          }else if(!chosen){
            res.status(404);
            return res.json({
              status: false,
              message: "inneligible",
            });
          }
         
        } else {
          res.status(400);
          res.json({
            status: false,
            message: "invalid certificate link",
          });
        }
      });
    } else {
      res.status(400);
      res.json({
        status: false,
        message: "invalid input",
      });
    }
};

module.exports.name = name;
module.exports.emailverification = emailverification;
module.exports.details = details;
module.exports.generate = generate;
