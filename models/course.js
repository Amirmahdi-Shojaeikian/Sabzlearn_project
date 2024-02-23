const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    cover:{
        type: String,
        required: true,
    },
    support:{
        type: String,
        required: true,
    },
    href:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    status:{
        type: String,
        enum: ["Presell", "End" ,"Performing"],
        default : "Presell",
    },
    discount:{
        type:Number,
        require: true,
    },
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref : "Category",
        required: true
    },
    creator:{
        type : mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

},
{ timestamps: true })

schema.virtual("sessions",{
    ref: "Session",
    localField: "_id",
    foreignField : "course"
})
schema.virtual("comments",{
    ref: "Comment",
    localField: "_id",
    foreignField : "course"
})



const model = mongoose.model("Course",new mongoose.Schema(schema))

module.exports = model

