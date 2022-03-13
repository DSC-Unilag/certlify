const { Schema, model } = require('mongoose');

const OTPSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
        default: Math.floor(100000 + Math.random() * 900000)
    },
    expiry_date: {
        type: Date,
        default: new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

exports.OTP = model('OTP', OTPSchema);
