const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

exports.Token = model('Token', tokenSchema)
