const mongoose = require("mongoose");

// UserSchema
const Schema = mongoose.Schema;

const eligibleUserSchema = new Schema({
    email: {
        type: String,
    },
    name: String,
    certificate_id: {
        type:mongoose.SchemaTypes.ObjectId
    },
    status: Boolean
});

let EligibleUser = mongoose.model("link", eligibleUserSchema);

module.exports = EligibleUser;
