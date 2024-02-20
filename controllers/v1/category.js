const categoryModel = require("./../../models/category")

exports.create = async (req, res) => {
    const { title, href } = req.body
    const category = await categoryModel.create({ title, href })
    res.json(category)

};
exports.getAll = async (req, res) => {
    const allCategory = await categoryModel.find({})
    res.json(allCategory)

};
exports.remove = async (req, res) => {
    const id = req.params.id
    const isCategory = await categoryModel.findOne({ _id: id })
    if (!isCategory) {
        return res.json({
            message: "Category not exist"
        })
    }
    const removeCategory = await categoryModel.findOneAndDelete({ _id: id })
    return res.json({removeCategory})
};
exports.update = async (req, res) => {
    const id = req.params.id
    const isCategory = await categoryModel.findOne({ _id: id })
    if (!isCategory) {
        return res.json({
            message: "Category not exist"
        })
    }
    const {title , href} = req.body
    const updateCategory = await categoryModel.findByIdAndUpdate({_id: id},{
        title,
        href
    })
    return res.json({updateCategory});


};