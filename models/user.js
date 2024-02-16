const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: 'string',
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
}, { timestamps: true })


const model = mongoose.model("User", new mongoose.Schema(schema));


module.exports = model