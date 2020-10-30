const Link = require("../models/links");
const transporter=require("./emailer");
const config = require("../config/database");
var jwt = require("jsonwebtoken");
let secret = process.env.DATABASE || config.secret;


let name = (req, res) => {
    let link = req.session.link;
        Link.findOne({ link: link }, (err, cert) => {
            if (cert) {
                    res.status(200)
                    return res.json({
                        status: true,
                        data: {
                            name: cert.name
                        }
                    })
            } else {
                res.status(400);
                res.json({
                    status: false,
                    message: "invalid certificate link"
                })
            }
        })

}


// emailverification before access to generate certificate
let emailverification = (req, res) => {
let link=req.param.link
let email=req.body.email;
Link.findOne({ link: link }, (err, cert) => {
    if (cert) {
      let loop= async()=>{
        for (i in cert.eligibleUsers) {
            if (cert.eligibleUsers[i].email == email) {
                if(!cert.eligibleUsers[i].status){
                  await jwt.sign({ email,link}, secret, function (err, token) {
                        transporter.sendMail({
                            from: '"certificator" <certificator@gmail.com>', // sender address
                            to: `${email}`, // list of receivers
                            subject: "generationlink", // Subject line
                            text: `${req.hostname}/certify/${token}`, // plain text body
                            html: `<a href="${req.hostname}/certify/${token}">${req.hostname}/certify/${token}</a>`, // html body
                          });
                          return res.json({
                              status:true,
                              message:"email sent"
                          })
                    });
                }else{
                    res.status(409)
                    return res.json({
                        status: false,
                        message: "generated"
                    })
                }
            }
        }
        res.status(404);
        return res.json({
            status: false,
            message: "inneligible"
        })
      } 
      loop();
    } else {
        res.status(400);
        res.json({
            status: false,
            message: "invalid certificate link"
        })
    }
})
}


let generate = (req, res) => {
    let link = req.session.link;
    let email = req.session.email;
    if (email) {
        if (req.body.name && req.body.name != "") {
            Link.findOne({ link: link }, (err, cert) => {
                if (cert) {
                    for (i in cert.eligibleUsers) {
                        if (cert.eligibleUsers[i].email == email) {
                            if(!cert.eligibleUsers[i].name){
                                cert.eligibleUsers[i].name = req.body.name
                                cert.save((err) => {
                                    if (err) throw err;
                                    else {
                                        res.status(200);
                                        return res.json({
                                            status: true,
                                            message: "generate"
                                        })
                                    }
                                });
                            }else{
                                res.status(409)
                                return res.json({
                                    status: false,
                                    message: "generated"
                                })
                            }
                        }
                    }
                    res.status(404);
                    return res.json({
                        status: false,
                        message: "inneligible"
                    })
                } else {
                    res.status(400);
                    res.json({
                        status: false,
                        message: "invalid certificate link"
                    })
                }
            })
        } else {
            res.status(400);
            res.json({
                status: false,
                message: "invalid input"
            })
        }
    } else {
        res.redirect("/login");
    }
}

module.exports.name=name;
module.exports.emailverification=emailverification;