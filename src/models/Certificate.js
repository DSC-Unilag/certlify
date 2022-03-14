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
    required: true,
    unique: true,
  },
  boundary: [boundarySchema],
  eligibleUsers: [eligibleUser],
});

let Certificate = mongoose.model("Certificate", certificateSchema);

exports.Certificate = Certificate;