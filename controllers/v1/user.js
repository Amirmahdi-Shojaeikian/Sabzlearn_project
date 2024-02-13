const userModel = require("./../../models/user")
const banUserModel = require("./../../models/ban_phone")
const mongoose = require("mongoose")


exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({_id: req.params.id}).lean()
    const banUser = banUserModel.create({phone: mainUser.phone})
    if (mongoose.isValidObjectId(req.params.id)) {
        if (banUser) {
            return res.status(200).json("phone ban successfully :))")
        }
        return res.status(500).json("server error !!!")
    } else {
        return res.json("server error !!!")

    }
}