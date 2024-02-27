const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
},
{ timestamps: true })

const model = mongoose.model("Department",new mongoose.Schema(schema))

module.exports = model

