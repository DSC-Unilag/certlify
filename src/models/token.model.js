const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({
    value: {
        type: String,
        required: [true, 'Cannot store empty token'],
    },
    date: {
        type: Date, 
        default: Date.now,
    }
})

exports.Token = model('Token', tokenSchema)
