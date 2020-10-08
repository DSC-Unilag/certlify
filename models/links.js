const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// UserSchema
const Schema = mongoose.Schema;

const boundarySchema = new Schema({
  bottom: Array,
  left: Array,
  right: Array,
  fontsize: Number,
  color: String,
});

const eligibleUser = new Schema({
  email: {
    type: String,
    sparse: true
  },
  name: String,
  status: Number,
});

const linkSchema = new Schema({
  issuer:String,
  name:String,
  src:String,
  link: {
    type: String,
    required: true,
    unique: true,
  },
  boundary: [boundarySchema],
  eligibleUsers: [eligibleUser],
});

// uniqueValidator plugin for presave validation of unique fields. Check the docs for more details
linkSchema.plugin(uniqueValidator);
let Link = mongoose.model("link", linkSchema);

module.exports = Link;
