const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    free: {
        type: Number,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
    },
}, { timestamps: true })

const model = new mongoose.model("Session", new mongoose.Schema(schema))




module.exports = model



