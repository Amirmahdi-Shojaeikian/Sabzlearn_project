const articleModel = require("./../../models/article")

exports.create = async (req,res) => {
    const {title,description,body,cover,href,category} = req.body

    const createArticles = await articleModel.create({
        title,
        description,
        body,
        cover,
        creator : req.user._id,
        href,
        category,
        publish : 1
    })

    return res.json(createArticles)

}


exports.getAll = async (req,res) => {
    const getAllArticles = await articleModel.find({})
    .populate("category","_id title")
    .populate("creator","_id name")

    return res.json(getAllArticles)
}



exports.getOne = async (req,res) => {
    const {href} = req.params
    const findArticle = await articleModel.findOne({href})
    if (!findArticle) {
        return res.json({message : "not found" })
    }

    return res.json(findArticle)

}


exports.remove = async (req,res) => {
    const {id} = req.params
    const removeArticle = await articleModel.findOneAndDelete({_id : id})
    if (!removeArticle) {
        return res.json({message : "not found" })
    }
    return res.json(removeArticle)

}


exports.update = async (req,res) => {
    const {id} = req.params
    const {title,description,body,cover,href,publish} = req.body
    const updateArticle = await articleModel.findOneAndUpdate({_id : id},{
        title,
        description,
        body,
        cover,
        href,
        publish
    })
    if (!updateArticle) {
        return res.json({message : "not found" })
    }

    return res.json(updateArticle)
}


exports.saveDraft = async (req,res) => {
    const {title,description,body,cover,creator,href,category,publish} = req.body

    const draftArticle = await articleModel.create({
        title,
        description,
        body,
        cover,
        creator : req.user._id,
        href,
        category,
        publish : 0
    })

    return res.json(draftArticle)
}





// {
//     "title":"سایت فروشگاهی",
//  "description" : "قبخبلعاثشقالرخسیظباخثصهاقرخ د",
//  "body" : "شخهثسیلارخثصهاقسهینمسنیردسسسسسسسسسسسسسسسسسسسسسسسسسسسسسمسندیرخسرخصسدرمص",
//  "cover" : "test",
//  "href" : "site shop",
//  "category" : "65d24fd530c901cdc6f56f8d"}