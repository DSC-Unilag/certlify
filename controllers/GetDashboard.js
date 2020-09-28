const User = require("../models/users");
const Links = require("../models/links");

// controller to serve the dashboard data for a logged in user
let dashboard = (req, res) => {
    let email = req.session.email
    if (email) {
        User.findOne({ email }, 'name, certificateUrls', function (err, user) {
            let certs = [];
            if (user) {
                let data = {}
                let links = user.certificateUrls
                for (i in links) {
                    Links.findOne({ link: links[i] }, 'link, boundary,eligibleUsers', function (err, cert) {
                        if (cert) {
                            data.name = user.name
                            data.certificateUrls = user.certificateUrls
                            data.link = cert.link
                            data.boundary = cert.boundary
                            res.json(data)
                        } else {
                            data.name = user.name
                            data.certificateUrls = user.certificateUrls
                            res.json(data)
                        }
                    })
                }
            }
        })
    } else {
        // login alert
    }

}
module.exports=dashboard;