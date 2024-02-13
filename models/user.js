const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username :{
        type: 'string',
        required: true
    },
    name :{
        type: 'string',
        required: true
    },
    email :{
        type: 'string',
        required: true,
        unique : true,
    },
    password :{
        type: 'string',
        required: true
    },
    phone :{
        type: 'string',
        required: true
    },
    role :{
        type: 'string',
        enum:["ADMIN","USER"],
        default: "USER",
    },
},{timestamps:true})


const model = mongoose.model("User", schema)



module.exports = model