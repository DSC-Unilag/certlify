const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// UserSchema
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  // The name would be the name of the body or organization issuing certificates. It doesn't matter much for those that want to generate certificate.
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  passwordhash: {
    type: String,
  },
  profilePicture:String,
  certificateUrls: [String],
});

// uniqueValidator plugin for presave validation of unique fields. Check the docs for more details
UserSchema.plugin(uniqueValidator);
let User = mongoose.model("User", UserSchema);

module.exports = User;
