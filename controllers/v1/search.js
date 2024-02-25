const courseModel = require("../../models/course")

exports.get = async(req,res) => {
    const {keyword} = req.params
    const searchCourse = await courseModel.find({
        name: {$regex: ".*" + keyword + ".*"}
    })
    return res.json(searchCourse)
}
