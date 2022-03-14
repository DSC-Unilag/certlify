// Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectorSchema = new Schema({
    certificate_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate',
        required: true
    },
    email: {
        type: String,
        sparse: true
    },
    name: String,
    status: Boolean,
});

exports.Collector = mongoose.model("Collector", collectorSchema);
