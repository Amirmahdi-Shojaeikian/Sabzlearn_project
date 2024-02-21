const mongoose = require("mongoose")

const schema = mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },


},
    { timestamps: true })



const model = mongoose.model("CourseUser", new mongoose.Schema(schema))

module.exports = model

