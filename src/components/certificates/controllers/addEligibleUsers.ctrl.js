/*

  Here I define functions to be used in my routes again, seems like man's just doing the same things over and over

*/

// Bring in the links model
const Certificate = require("../models/certificates");

// Load dependencies
var fs = require('fs');
const csv = require("csvtojson");
const multer = require("multer");
const path = require('path');
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response");

// This is as used in the last project
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, req.body.email + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('FileUpload');

// This gets the users from the csv file to the json to be stored in the mongoDB database
const addEligibleUsers = (req, res) => {

  //  An easy way to know the function works, let it log something
  // console.log("started")

  // The real upload part
  upload(req, res, function (err) {

    // We have to be sure there's no error, so we check to be safe
    if (err instanceof multer.MulterError) {
      console.log("multer error")
      throw err
    } else if (err) {
      throw err
    } else {

      // Set save location and format
      const csvFilePath = __dirname + `/${req.body.email}.csv`
      fs.readFile(csvFilePath, 'utf8', function (err, data) {
        let newcase = data.replace(/email/i, "email");
        newcase = newcase.replace(/name/i, "name");
        fs.writeFile(csvFilePath, newcase, function (err) {
          if (err) {
            const result = generateResponse(401, createError("something went wrong"));
            return res.status(result.status).json(result.result)
          }
          csv()
            .fromFile(csvFilePath) // Converts the csv file to json
            .then(async (users) => {
              // console.log(users);
              fs.unlink(csvFilePath, (err) => {
                if (err) throw err;
              });
              const cert = await Certificate.findOne({ $or: [{ link: req.params.link }, { _id: req.params.link }] })

              // We see if there's actually a certificate to collect, yunno, it only makes sense
              if (cert) {

                // You must be logged in to upload eligible users
                if (cert.issuer == req.body.email) {

                  // Deal with each user in the uploaded csv
                  users.forEach((user) => {
                    // This is set to true on collection of the certificate
                    user.status = false;
                    if (user.name) {
                      user.status = true;
                    }

                    // Should a user row not have email
                    if (!user.email) {
                      const result = generateResponse(400, createError("check the format of the CSV file"));
                      return res.status(result.status).json(result.result)
                    }
                  })

                  // Since each user row has been verified to contain email, they're eligible to get the certificate

                  cert.eligibleUsers = cert.eligibleUsers.concat(users);
                  // Add to eligible users model

                  // Now after all is said and done, saving now would make sense
                  cert.save((err) => {
                    if (err) {
                      console.log(err);
                      const result = generateResponse(400, createError("check the format of the CSV file"));
                      return res.status(result.status).json(result.result)
                    } else {
                      // console.log("done")
                      const result = generateResponse(201, createSuccessMessage({ message: "check the format of the CSV file" }));
                      return res.status(result.status).json(result.result)
                    }
                  })
                } else {
                  const result = generateResponse(401, createError("Unauthorized access"));
                  return res.status(result.status).json(result.result)
                }
              } else {
                const result = generateResponse(404, createError("certificate not found"));
                return res.status(result.status).json(result.result)
              }
            })
        })
      });
    }
  })
}

module.exports.addNew = addEligibleUsers;
