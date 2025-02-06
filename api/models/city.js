const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
},
    { timestamps: true }
);

module.exports = mongoose.model('City', citySchema);