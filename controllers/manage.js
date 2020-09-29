const User = require("../models/users");
const Links = require("../models/links");
const config = require("../config/database");
const rounds = process.env.ROUNDS || config.rounds;

let getCollectors=(req,res)=>{
    if (!req.session.email){
        res.status(401);
       return res.json({
            status:false,
            message:"user not logged in"
        })
    }
    req.session.link=req.params.link
    Links.findOne({ link:req.params.link }, function (err, cert) {
        if(cert){
            if(cert.issuer==req.session.email){
                res.json({
                    status:true,
                    collectors:cert.eligibleUsers
                });
            }else{
                res.status(400)
                res.json({
                    status:false,
                    message:"Unauthorized access"
                });
            }
        }else{
            res.status(404)
            res.json({
                status:false,
                message:"certificate not found"
            })
        }
    })
}

let edit=(req,res)=>{
    if (!req.session.email){
      return res.json({
            status:false,
            message:"user not logged in"
        })
    }
    req.session.link=req.params.link
    Links.findOne({ link:req.params.link}, function (err, cert) {
        if(cert){
            if(cert.issuer==req.session.email){
                res.json({
                    status:true,
                    boundaries:cert.boundary
                });
            }else{
                res.status(400)
                res.json({
                    status:false,
                    message:"Unauthorized access"
                });
            }
        }else{
            res.status(404)
            res.json({
                status:false,
                message:"certificate not found"
            })
        }
    })
}

let update=(req,res)=>{
    if (!req.session.email){
      return res.json({
            status:false,
            message:"user not logged in"
        })
    }
    req.session.link=req.params.link

    let boundary=req.body.boundaries;
    Links.findOne({ link:req.params.link}, function (err, cert) {
        if(cert){
            if(cert.issuer==req.session.email){
                cert.boundary=boundary;
                cert.save((err)=>{
                    if (err) throw err;
                    res.json({
                        status:true,
                        message:"certificate successfully updated"
                    })
                })
            }else{
                res.status(400)
                res.json({
                    status:false,
                    message:"Unauthorized access"
                });
            }
        }else{
            res.status(404)
            res.json({
                status:false,
                message:"certificate not found"
            })
        }
    })
}

module.exports.getCollectors=getCollectors;
module.exports.edit=edit;
module.exports.update=update;