/*

	Here I define functions to be used in my routes again, seems like man's just doing the same things over and over

*/

// Bring in the links model
const  Link= require("../models/links");

// Load dependencies
var fs = require('fs');
const csv = require("csvtojson");
const multer = require("multer");
const path = require('path');

// This is as used in the last project
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, req.session.email+ path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('FileUpload');

// This gets the users from the csv file to the json to be stored in the mongoDB database
const addEligibleUsers = (req, res) => {

    //  An easy way to know the function works, let it log something
    // console.log("started")

    // The real upload part
    upload(req,res,function (err){

        // We have to be sure there's no error, so we check to be safe
        if (err instanceof multer.MulterError) {
             console.log("multer error")
            throw err
        } else if (err) {
            throw err
        } else {

            // Set save location and format
            const csvFilePath=__dirname+`/${req.session.email}.csv`
            fs.readFile(csvFilePath,'utf8', function(err, data) {
                let newcase=data.replace(/email/i,"email");
                    newcase=newcase.replace(/name/i,"name");
                fs.writeFile(csvFilePath,newcase , function (err) {
                    csv()
                    .fromFile(csvFilePath) // Converts the csv file to json
                    .then((users) => {
                        // console.log(users);
                        fs.unlink(csvFilePath, (err) => {
                            if (err) throw err;
                          });
                        Link.findOne({ link:req.params.link }, (err, cert) => {
    
                            // We see if there's actually a certificate to collect, yunno, it only makes sense
                            if (cert) {
    
                                // You must be logged in to upload eligible users
                                if (cert.issuer == req.session.email) {
    
                                    // Deal with each user in the uploaded csv
                                    for (i in users) {
    
                                        // This is set to true on collection of the certificate
                                        users[i].status = false;
                                        if(users[i].name){
                                            users[i].status = true;
                                        }
                                        
                                        // Should a user row not have email
                                        if (!users[i].email) {
                                            res.status(400)
                                            return res.json({
                                                status: false,
                                                message: "check the format of your csv file"
                                            })
                                        }
                                    }
    
                                    // Since each user row has been verified to contain email, they're eligible to get the certificate
                                   
                                    cert.eligibleUsers =cert.eligibleUsers.concat(users);
                                    
                                    // Now after all is said and done, saving now would make sense
                                    cert.save((err) => {
                                        if (err) {
                                             console.log(err);
                                            res.status(400)
                                            res.json({
                                                status: false,
                                                message: "check the format of your csv file"
                                            })
                                        } else {
                                            // console.log("done")
                                            res.status(201)
                                            res.json({
                                                status: true,
                                                message: "successfully added eligible users"
                                            })
                                        }
                                    })
                                } else {
                                    res.status(401);
                                    res.json({
                                        status:false,
                                        message:"unauthorized access"
                                    })
                                }
                            } else {
                                res.status(404)
                                res.json({
                                    status:false,
                                    message:"certificate does not exist"
                                })
                            }
                        })
                    })
                })
              });
            }
        })
    }

module.exports.addNew = addEligibleUsers;
