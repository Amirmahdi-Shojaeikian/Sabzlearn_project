const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    cover :{
        type: String,
        required: true,
    },
    creator :{
        type : mongoose.Types.ObjectId,
        ref : "User",
        required: true,
    },
    href :{
        type:String,
        required: true,
    },
    category:{
        type : mongoose.Types.ObjectId,
        ref : "Category",
        required: true,
    },
    publish:{
        type:Number,
        required: true,
    },

},{timestamps : true})



const model = new mongoose.model("Article", new mongoose.Schema(schema))

module.exports = model

