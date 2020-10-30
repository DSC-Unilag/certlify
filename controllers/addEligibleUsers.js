/*

	Here I define functions to be used in my routes again, seems like man's just doing the same things over and over

*/
// Bring in the links model
const  Link= require("../models/links");

// Load dependencies
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

const addEligibleUsers = (req, res) => {
    console.log("started")
    upload(req,res,function (err){
      if (err instanceof multer.MulterError){
        console.log("multer error")
        throw err
      }else if(err){
        throw err
      }else{
        const csvFilePath=__dirname+`/${req.session.email}.csv`
        csv()
      .fromFile(csvFilePath)
      .then((users)=>{
          console.log(users);
        Link.findOne({link:req.params.link},(err,cert)=>{
            if (cert){
                if(cert.issuer==req.session.email){
                    for (i in users){
                        users[i].status=false;
                        if(!users[i].email){
                             res.status(400)
                            return res.json({
                                status: false,
                                message: "check the format of your csv file"
                            })
                        }
                    }
                    cert.eligibleUsers=users;
                    cert.save((err)=>{
                        if(err) {
                            console.log(err);
                            res.status(400)
                            res.json({
                                status: false,
                                message: "check the format of your csv file"
                            })
                        }
                        else{
                            console.log("done")
                            res.status(201)
                            res.json({
                                status: true,
                                message: "successfully added eligible users"
                            })
                        }
                    })
                }else{
                    res.status(401);
                    res.json({
                        status:false,
                        message:"unauthorized access"
                    })
                }
            }else{
                res.status(404)
                res.json({
                    status:false,
                    message:"certificate does not exist"
                })
            }
        })
      })
      }
  
    })
  }

module.exports.addNew = addEligibleUsers;
