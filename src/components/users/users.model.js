const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
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
    profilePicture: String,
    certificateUrls: [String],
    confirmed: {
        type: Boolean,
        default:false
    }
});

// uniqueValidator plugin for presave validation of unique fields. Check the docs for more details
UserSchema.plugin(uniqueValidator);
let User = mongoose.model("User", UserSchema);

module.exports = User;
