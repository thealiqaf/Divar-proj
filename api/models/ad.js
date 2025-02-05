const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: [{ type: String }],
    city: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'city' },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    status: { type: String, enum: ["pending", "approved"], default: 'pending' }
},
    { timestamps: true }
);

module.exports = mongoose.model('Ad', adSchema);