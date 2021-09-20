const User = require("../models/users");
const Links = require("../models/links");

// controller to serve the dashboard data for a logged in user
let dashboard = (req, res) => {
    let email

    // Check auth user
    if (req.session.email) {
        email = req.session.email
    } else {
        email = req.session.anon
    }

    if (email) {

        User.findOne({ email }, function (err, user) {
            let data = {}
            if (user) {
                data.name = user.name
                data.certificateUrls = user.certificateUrls
                data.certs = [];
                let links = user.certificateUrls

                // Get user certificates
                Links.find({
                    link: { $in: links }
                }, function (err, docs) {
                    // come back to do this like a normal human
                    for (i in docs) {
                        data.certs[i] = {};
                        data.certs[i].name = docs[i].name
                        data.certs[i].link = docs[i].link
                        data.certs[i].thumb = docs[i].thumb
                        data.certs[i].boundary = docs[i].boundary
                    }
                    res.json(data);
                });

            } else {

                res.status(401)
                res.json({
                    status: false,
                    message: "Unregistered user"
                })
            }
        })
    } else {
        res.status(401)
        res.json({
            status: false,
            message: "user not signed in"
        })
    }

}
module.exports = dashboard;