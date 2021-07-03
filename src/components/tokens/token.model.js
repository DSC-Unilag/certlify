import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
    value: {
        type: String,
        required: [true, 'Cannot store empty token'],
    },
    date: {
        type: Date, 
        default: Date.now,
    }
});

export const Token = model('Token', tokenSchema);
