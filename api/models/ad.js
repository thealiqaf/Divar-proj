const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: [String], default: [] },
    city: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'City' },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ["pending", "approved"], default: 'pending' }
}, 
{ timestamps: true });

module.exports = mongoose.model('Ad', adSchema);
