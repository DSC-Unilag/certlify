const User = require("../models/users");
const Links = require("../models/links");

// controller to serve the dashboard data for a logged in user
let dashboard = (req, res) => {
    let email = req.session.email
    if (email) {
        User.findOne({ email }, 'name, certificateUrls', function (err, user) {
            let data={}
            if (user) {
                data.name = user.name
                data.certificateUrls = user.certificateUrls
                data.certs= [];
                let links = user.certificateUrls
                for (i in links) {
                    data.certs[i]={}
                    Links.findOne({ link: links[i] }, 'link, boundary,eligibleUsers', function (err, cert) {
                        if (cert) {
                            data.certs[i].name = cert.name
                            data.certs[i].link = cert.link
                            data.certs[i].boundary = cert.boundary
                        }
                    })
                }
                res.json(data);
            }else{
                res.status(501)
                res.json({
                    status:false,
                    message:"Unregistered user"
                })
            }
        })
    } else {
        res.status(501)
        res.json({
            status:false,
            message:"user not signed in"
        })
    }

}
module.exports=dashboard;