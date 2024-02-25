const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
    },
    phone :{
        type: String,
        required: true,
    },
    isAnswer:{
        type:Number,
        required: true,
    },
    body:{
        type: String,
        required: true,
    }
},{timestamps : true})



const model = new mongoose.model("Contact", new mongoose.Schema(schema))

module.exports = model

