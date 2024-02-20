const courseModel = require("./../../models/course")
const sessionsModel = require("./../../models/session")

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
    const removeSession = await sessionsModel.findOneAndDelete({_id : req.params.id})
    if (!removeSession) {
        return res.status(404).json({
            message : "session not found"
        })
    }

    return res.json(removeSession)


}