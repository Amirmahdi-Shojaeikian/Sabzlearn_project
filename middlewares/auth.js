const jwt = require("jsonwebtoken")
const userModel = require("./../models/user")

module.exports = async(req, res, next) => {
    const authHeader = req.header("Authorization").split(" ")

    if (authHeader.length!== 2) {
        res.status(403).json({message : "this route protected"})
    }

    const token = authHeader[1]

    try {
        const jwtPayload = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(jwtPayload.id).lean()

        Reflect.deleteProperty(user,"password")

        req.user = user
        
    } catch (error) {
        res.json({error : error})
    }
}


