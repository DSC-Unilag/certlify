const User = require("../models/users");
const Links = require("../models/links");
const config = require("../config/database");
const rounds = process.env.ROUNDS || config.rounds;

let getCollectors=(req,res)=>{
    if (!req.session.email&&!req.session.anon){
        res.status(401);
       return res.json({
            status:false,
            message:"user not logged in"
        })
    }
    req.session.link=req.params.link
    Links.findOne({ link:req.params.link }, function (err, cert) {
        if(cert){
            if(cert.issuer==req.session.email||cert.issuer==req.session.anon){
                res.json({
                    status:true,
                    collectors:cert.eligibleUsers
                });
            }else{
                res.status(401)
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

let details=(req,res)=>{
    if (!req.session.email&&!req.session.anon){
        res.status(401)
      return res.json({
            status:false,
            message:"user not logged in"
        })
    }
    Links.findOne({ link:req.params.link}, function (err, cert) {
        if(cert){
            if(cert.issuer==req.session.email){
                res.json({
                    status:true,
                    name:cert.name,
                    src:cert.src,
                    link:req.params.link,
                    share:req.hostname + "/certificate/" + req.params.link,
                    boundary:cert.boundary
                });
            }else{
                res.status(401)
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
        res.status(404)
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
                res.status(401)
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
module.exports.details=details;
module.exports.update=update;