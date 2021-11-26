// Load all dependencies
const User = require("../../users/users.model");
var uniqid = require('uniqid');
const Certificate = require("../models/certificates");
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response");
if (process.env.CLOUDINARY_URL) {
  var cloudinary = require("cloudinary").v2
}

let certificate = async (req, res) => {
  try {
    let link = uniqid()
    //req.session.link = link;
    // change the finding user method
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      let result = generateResponse(404, createError("Unauthenticated user"));
      return res.status(result.status).json(result.result)
    } else {
      user.certificateUrls.push(link);
      await user.save()
      if (process.env.CLOUDINARY_URL) {
        let upload  = await cloudinary.uploader.upload(req.body.src)
        await Certificate.create({
          issuer: user.email,
          name: req.body.name,
          link: link,
          src: upload.url,
          thumb: req.body.thumb,
          boundary: req.body.boundary,
        })
        let result = generateResponse(201, createSuccessMessage({
          status: true,
          message: "certificate created",
          link: req.hostname + "/certificate/" + link,
          url: link
        }));
        return res.status(result.status).json(result.result)
      } else {
        await Certificate.create({
          issuer: user.email,
          name: req.body.name,
          link: link,
          src: req.body.src,
          thumb: req.body.thumb,
          boundary: req.body.boundary,
        })
        const result = generateResponse(201, createSuccessMessage({
          status: true,
          message: "certificate created",
          link: req.hostname + "/certificate/" + link,
          url: link
        }));
        return res.status(result.status).json(result.result)
      }
    }
  } catch (error) {
    const result = generateResponse(500, createError("something went wrong"));
    return res.status(result.status).json(result.result)
  }
}

module.exports = certificate;
