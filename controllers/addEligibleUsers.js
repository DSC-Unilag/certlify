/*

	Here I define functions to be used in my routes again, seems like man's just doing the same things over and over

*/
// Bring in the links model
const User = require("../models/links");
const config = require("../config/database");
const rounds = process.env.DATABASE || config.rounds;

// Load dependencies
const csvtojson = require("csvtojson");
const multer = require("multer");

// This is as used in the last project
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/csv/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addEligibleUsers = (upload.single('FileUpload'), (req, res, next) => {

	// This too, is from the last project, I really hope I get time to learn these things properly
  	csvtojson(__dirname + "\\" + req.file.path)
	    .fromFile()
	    .then((result) => {
	      	res.send(result);
	    })
});

module.exports.addNew = addEligibleUsers;
