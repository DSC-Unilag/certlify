// Load dependencies, you have to do this
const Link = require("../models/links");
const nodemailer = require("nodemailer");
const config = require("../config/database");
var jwt = require("jsonwebtoken");
let secret = process.env.SECRET || config.secret;

/**
 * This is the function that is fired when a get request is made to the "/api/name" endpoint
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
let name = (req, res) => {
  /**
   * On the session object which is attached to the request object, has a unique identifier for a particular certificate stored on it as a string. The string is then stored to a variable called link
   * @type {string}
   */
  let link = req.session.link;
  /**
   * Using the find one method to check if the link identifier exists in the link collection model 
   */
  Link.findOne({ link: link }, (err, cert) => {
    /**
     * If the certificate exists, a response of 200 is sent to the frontend with a status of true and a data object containing properties name for teh name of the certificate and the unique identifier of the certificate
     */
    if (cert) {
      res.status(200);
      return res.json({
        status: true,
        data: {
          name: cert.name,
          link: cert.link,
        },
      });
    } 
    /**
     * If the document does not exist, a response of 400 is sent back to the frontend
     */
    else {
      res.status(400);
      res.json({
        status: false,
        message: "invalid certificate link",
      });
    }
  });
};


/**
 * This is the function that is fired when a get request is made to the "/api/details" endpoint unlike the "/api/name" endpoint it serves more details of the certificate including if the user has generated a certificate to the front end;
 * @param {object} req 
 * @param {object} res 
 */
let details = (req, res) => {
   /**
   * On the session object which is attached to the request object, has a unique identifier for a particular certificate stored on it as a string. The string is then stored to a variable called link
   * @type {string}
   */
  let link = req.session.link;
   /**
   * On the session object which is attached to the request object, The unique email of the user that wants to generate a certificate has been stored on the session. The string is then stored to a variable called email
   * @type {string}
   */
  let email = req.session.generator;
  /**
   * Using the findOne method to check if the link identifier exists in the link collection model 
   */
  Link.findOne({ link: link }, (err, cert) => {
    /**
     * if the certificate exists, looping through the array of objects in the eligibleUsers field, a check to find weather the email requesting for certificate exists. There is also a check to see if a certificate has been generated;
     */
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
    } 
    /**
     * If the certificate does not exist, a response of 400 is sent back to the frontend
     */
    else {
      res.status(400);
      res.json({
        status: false,
        message: "invalid certificate link",
      });
    }
  });
};

// emailverification before access to generate certificate

/**
 * 
 * @param {object} req 
 * @param {object} res 
 */
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
              from: "info@certlify.com", // sender address
              to: `${email}`, // list of receivers
              subject: "generationlink", // Subject line
              text: `generate your certificate at: ${req.hostname}/certify/${token}`, // plain text body
              html: `<h3>generate your certificate at: </h3> <a href="${req.hostname}/certify/${token}">${req.hostname}/certify/${token}</a>`, // html body
            };
            var transporter = nodemailer.createTransport({
              service: 'SendGrid',
              auth: {
                user: process.env.EMAIL||config.email,
                pass: process.env.PASSWORD||config.emailpass,
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

// It's always nice to give out something, here's our little gift to the project
module.exports.name = name;
module.exports.emailverification = emailverification;
module.exports.details = details;
module.exports.generate = generate;
