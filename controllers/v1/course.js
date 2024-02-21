const courseModel = require("./../../models/course")
const sessionsModel = require("./../../models/session")
const courseUsersModel = require("./../../models/course_user")
const categoryModel = require("./../../models/category")
const commentsModel = require("./../../models/comment")
const { default: mongoose } = require("mongoose")

exports.create = async (req, res) => {
    const {
        name,
        description,
        support,
        href,
        price,
        status,
        discount,
        categoryId,
    } = req.body

    const course = await courseModel.create({
        name,
        description,
        support,
        href,
        price,
        status,
        discount,
        categoryId,
        cover: req.file.filename,
        creator: req.user._id,
    })

    const mainCourse = await courseModel.find({ _id: course._id }).populate("creator", "-password")

    return res.status(201).json(mainCourse)

}


exports.createSession = async (req, res) => {
    const { title, time, free } = req.body
    const { id } = req.params

    const sessions = await sessionsModel.create({
        title,
        time,
        free,
        video: "test",
        course: id,
    })
    return res.status(201).json(sessions);
}


exports.getAll = async (req, res) => {
    const sessions = await sessionsModel.find({}).populate("course", "name").lean()
    return res.status(200).json(sessions)
}



exports.getSession = async (req, res) => {
    const course = await courseModel.findOne({ href: req.params.href }).lean()
    const session = await sessionsModel.findOne({ _id: req.params.sessionsId })

    const sessions = await sessionsModel.find({ course: course._id })
    return res.json({ session, sessions })

}



exports.removeSession = async (req, res) => {
    const removeSession = await sessionsModel.findOneAndDelete({ _id: req.params.id })
    if (!removeSession) {
        return res.status(404).json({
            message: "session not found"
        })
    }

    return res.json(removeSession)


}


exports.register = async (req, res) => {
    const isUserAlreadyRegistered = await courseUsersModel.findOne(
        { _id: req.user._id, course: req.params.id })

    if (isUserAlreadyRegistered) {
        return res.status(409).json({
            message: "user already registered"
        })
    }
    const register = await courseUsersModel.create({
        course: req.params.id,
        user: req.user._id,
        price: req.body.price
    })

    return res.status(201).json({
        message: "register successfully"
    })
}


exports.getCategoryById = async (req, res) => {
    const { href } = req.params;
    const isCategory = await categoryModel.findOne({ href })

    if (isCategory) {
        const courses = await courseModel.find({ categoryId: isCategory._id })

        return res.status(200).json({ courses })
    }

    return res.json([])
}


exports.getOne = async (req, res) => {

    const course = await courseModel
        .findOne({ href: req.params.href })
        .populate("creator", "-password")
        .populate("categoryId")

    const session = await sessionsModel.find({ course: course._id}).lean();
    const comment = await commentsModel.find({ course: course._id }).lean();

    const courseStudentCount = await courseUsersModel.find({ course : course._id}).countDocuments();
    const isUserBuyCourse = !!(await courseUsersModel.findOne({ course: course._id , user:req.user._id }))


    return res.json({ course, session, comment ,courseStudentCount,isUserBuyCourse  })
}


exports.remove = async (req, res) => {
    const isValidObjectID = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObjectID) {
        return res.status(409).json({
            message : "Invalid course Id"
        })
    }
    const removeCourse = await courseModel.findOneAndDelete({_id : req.params.id})

    if (!removeCourse) {
        return res.status(404).json({
            message : "Course not found"
        });
    }

    return res.json(removeCourse)

}


exports.relatedCourse = async (req,res) =>{
    const {href} = req.params;
    const course = await courseModel.findOne({href})

    if (!course) {
        return res.status(404).json({
            message : "CourseNotFound"
        });
    }

    let relatedCourses = await courseModel.find({
        categoryId : course.categoryId,
    })
    
    relatedCourses = relatedCourses.filter(course => course.href !== href )

    return res.json(relatedCourses)
}