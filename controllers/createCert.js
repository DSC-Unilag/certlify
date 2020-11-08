// Load all dependencies
const User = require("../models/users");
var uniqid = require('uniqid');
const Link = require("../models/links");
let cloudinary=require("cloudinary").v2

// cloudinary.config({
//     cloud_name:"de5neer84",
//     api_key:"488273542881848",
//     api_secret:"0dhjwq6UXnVpIzkMSaBI9sQCEws"
// })

let certificate = (req, res) => {
    if (!req.session.email&&!req.session.anon) {
        res.status(401)
        res.json({
            status: false,
            message: "user not logged in"
        })
    } else {
        let link = uniqid()
        req.session.link = link;
        User.findOne({ email: req.session.email||req.session.anon }, function (err, user) {
            if (!user) {
                res.status(401)
                res.json({
                    status: false,
                    message: "Unregistered User"
                })
            } else {
                user.certificateUrls.push(link);
                user.save((err) => {
                    if (err) throw err
                    else {
                        cloudinary.uploader.upload(req.body.src,(error,result)=>{
                            let cert = new Link({
                                issuer: req.session.email||req.session.anon,
                                name: req.body.name,
                                link: link,
                                src:result.url,
                                thumb:req.body.thumb,
                                boundary: req.body.boundary,
                            })
                            cert.save(function (err, doc) {
                                if (err) return console.error(err);
                                res.json({
                                    status: true,
                                    message: "certificate created",
                                    link: req.hostname + "/certificate/" + link,
                                    url:link
                                })
                            });
                        })
                       
                    }
                })
            }
        })
    }
}

module.exports = certificate;
