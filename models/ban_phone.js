const mongoose = require('mongoose');

const schema = mongoose.Schema({
    phone: {
        type: 'string',
        required: true
    },

}, {timestamps: true})


const model = mongoose.model("BanUser", schema)


module.exports = model