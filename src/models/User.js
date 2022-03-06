// Import dependencies
const mongoose = require('mongoose');
const Types = mongoose.Types;

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    email_verified_at: {
        type: Date,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password'];
        return ret;
    }
});

exports.User = mongoose.model("User", UserSchema);
