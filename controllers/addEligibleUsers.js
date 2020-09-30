/*

	Here I define functions to be used in my routes again, seems like man's just doing the same things over and over

*/
// Bring in the links model
const  Link= require("../models/links");
const config = require("../config/database");
const rounds = process.env.DATABASE || config.rounds;

// Load dependencies
const csv = require("csvtojson");
const multer = require("multer");

// This is as used in the last project
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname+'/uploads/csv/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, req.session.email + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addEligibleUsers = (req, res) => {
    upload(req,res,function (err){
      if (err instanceof multer.MulterError){
        console.log("multer error")
        throw err
      }else if(err){
        throw err
      }else{
        const csvFilePath=__dirname+'/uploads/csv/data.csv'
        csv()
      .fromFile(csvFilePath)
      .then((users)=>{
        Link.findOne({link:req.params.link},(err,cert)=>{
            if (cert){
                if(cert.issuer==req.session.email){
                    users=JSON.parse(users);
                    for (i in users){
                        users[i].status=0;
                    }
                    cert.eligibleUsers=users;
                    cert.save((err)=>{
                        if(err) throw err;
                        else{
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
