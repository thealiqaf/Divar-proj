const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true }, 
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
},
{ timestamps: true } 
);

module.exports = mongoose.model('User', userSchema);