const commentsModel = require("./../../models/comment")
const courseModel = require("./../../models/course")



exports.create = async (req, res) => {
    const { body, courseHref, score } = req.body

    const course = await courseModel.findOne({ href: courseHref }).lean()

    const comment = await commentsModel.create({
        body,
        course: course._id,
        creator: req.user._id,
        score,
        isAnswer: 0,
        isAccept: 0
    })

    return res.status(201).json(comment)
};



exports.remove = async (req, res) => {
    const commentDelete = await commentsModel.findOneAndDelete({ _id: req.params.id })

    if (!commentDelete) {
        return res.status(404).json({ message: "Comment not found" })
    }

    return res.json(commentDelete)
};


exports.accept = async (req, res) => {
    const commentAccept = await commentsModel.findOneAndUpdate({ _id: req.params.id },
        {
            isAccept: 1
        })
    if (!commentAccept) {
        return res.status(404).json({ message: "Comment not found" })
    }

    return res.json(commentAccept)


};

exports.reject = async (req, res) => {
    const commentReject = await commentsModel.findOneAndUpdate({ _id: req.params.id },
        {
            isAccept: 0
        })
    if (!commentReject) {
        return res.status(404).json({ message: "Comment not found" })
    }

    return res.json(commentReject)

};

exports.answer = async (req, res) => {
    const { body } = req.body;

    const acceptComment = await commentsModel.findOneAndUpdate({ _id: req.params.id }, {
        isAccept: 1,
    })

    if (!acceptComment) {
        return res.status(404).json({
            message: 'comment not found'
        })
    }

    const answerComment = await commentsModel.create({
        body,
        course: acceptComment.course,
        creator: req.user._id,
        isAnswer: 1,
        isAccept: 1,
        mainCommentId : req.params.id
    })

    return res.status(201).json(answerComment)
}