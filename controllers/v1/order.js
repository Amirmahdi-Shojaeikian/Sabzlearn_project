const userCourseModel = require("../../models/course_user")

exports.getAll = async (req,res) => {
    const getCourse = await userCourseModel.find({}).populate("course")
    return res.json(getCourse)
}

exports.getOne = async (req,res) => {
    const getOneCourse = await userCourseModel.findOne({_id : req.params.id })
    .populate("course")

    return res.json(getOneCourse)

}