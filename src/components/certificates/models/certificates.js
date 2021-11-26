const mongoose = require("mongoose");

// UserSchema
const Schema = mongoose.Schema;

const boundarySchema = new Schema({
  bottom: Array,
  left: Array,
  right: Array,
  fontsize: Number,
  fontfamily:String,
  color: String,
});

const eligibleUser = new Schema({
  email: {
    type: String,
    sparse: true
  },
  name: String,
  status: Boolean,
});

const certificateSchema = new Schema({
  issuer:String,
  name:String,
  src:String,
  thumb:String,
  link: {
    type: String,
    unique: true,
  },
  boundary: [boundarySchema],
  eligibleUsers: [eligibleUser],
});
// run migration to a certificate collection later...maybe
// Leave the collection name as link for now...abeg
let Certificate = mongoose.model("link", certificateSchema);

module.exports = Certificate;
