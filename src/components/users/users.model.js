const mongoose = require("mongoose")
const { isEmail } = require("../../utils/validator")
const { genSalt, hash } = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: [true, 'Email is already in use'],
        required: [true, 'Email is required'],
        lowercase: true,
        validate: [(value) => { return isEmail(value) }, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password cannot be less than 8 characters'],
        maxLength: [20, 'Password cannot be greater than 20 characters']
    },
    profilePicture: String,
    certificateUrls: [String],
    confirmed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date, 
        default: Date.now,
    }
});

UserSchema.pre('save', async function (next) {
    this.password = await hash(this.password, await genSalt());
    next();
});

// To make sure when we fetch a user, the email is always omitted
UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password']
        return ret
    }
})

exports.User = mongoose.model("User", UserSchema);
