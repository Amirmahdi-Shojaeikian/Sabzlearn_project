const { default: mongoose } = require("mongoose")
const courseModel = require("./../../models/course")
const offsModel = require("./../../models/off")
const { removeSession } = require("./course")

exports.getAll = async (req,res) => {
    const offs = await offsModel.find({},"-__v")
    .populate("course","name href")
    .populate("creator","name")

    return res.json(offs)
}

exports.create = async (req,res) => {
    const {code , percent , max , course} = req.body
    const offCourse = await offsModel.create({
        code ,
        percent ,
        max ,
        course,
        uses:0,
        creator : req.user 
    })
    return res.json(offCourse)
}
exports.setOnAll = async (req,res) => {
    const {discount} = req.body
    const courseDiscount = await courseModel.updateMany({discount})
    return res.json(discount)
}
exports.getOne = async (req,res) => {
    const {code} = req.params
    const {course} = req.body

    if (!mongoose.Types.ObjectId.isValid(course)) {
        return res.json({
            message : " course id is not valid"
        })
    }

    const off = await offsModel.findOne({code,course})

    if (!off) {
        return removeSession.this.status(404).json({message:"offCourse not found"})
    }else if (off.max == off.uses){
        return res.status(409).json({
            message : "this off already used"
        })
    }else{
        const updateOff = await offsModel.findOneAndUpdate({code,course},
            {
                uses : off.uses + 1
            })
        return res.json(updateOff)
    }
}
exports.remove = async (req,res) => {

}
