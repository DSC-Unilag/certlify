const Link = require("../models/links");

let details = (req, res) => {
    let link = req.session.link;
    let email = req.session.email;
    if (email) {
        Link.findOne({ link: link }, (err, cert) => {
            if (cert) {
                if(cert.issuer==email){
                    res.status(200)
                    return res.json({
                        status: true,
                        generated: false,
                        data: {
                            src: cert.src,
                            boundary: cert.boundary
                        }
                    })
                }
                for (i in cert.eligibleUsers) {
                    if (cert.eligibleUsers[i].email == email) {
                        if (cert.eligibleUsers[i].name) {
                            res.status(200);
                            return res.json({
                                status: true,
                                generated: true,
                                data: {
                                    src: cert.src,
                                    name: cert.eligibleUsers[i].name,
                                    boundary: cert.boundary
                                }
                            })
                        }

                    }
                }
                res.status(200)
                return res.json({
                    status: true,
                    generated: false,
                    data: {
                        src: cert.src,
                        boundary: cert.boundary
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

    } else {
        res.redirect("/login");
    }
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

module.exports.details=details;
module.exports.generate=generate;