const newslettersModel = require("./../../models/newsletter")


exports.getAll = async (req,res) => {
    const newsletter = await newslettersModel.find()
    return res.json(newsletter)
}

exports.create = async (req, res) => {
    const {email} = req.body
    const newsletter = await newslettersModel.create({email})
    return res.json(newsletter)
}

