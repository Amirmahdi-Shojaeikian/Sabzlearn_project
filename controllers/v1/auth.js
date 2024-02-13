const userModel = require("../../models/user")
const banUserModel = require("./../../models/ban_phone")
const registerValidator = require("../../validators/register")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const validatorResult = registerValidator(req.body)
    if (validatorResult != true) {
        return res.status(422).json(validatorResult)
    }


    const { username, name, email, password, phone } = req.body
    const userIsExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (userIsExists) {
        return res.status(409).json("user or email is already")
    }

    const isUserBan = await banUserModel.find({ phone })

    if (isUserBan.length) {
        return res.status(409).json("phone is ban :)))")
    }



    // const countOfUsers = await userModel.count();

    const hashPassword = await bcrypt.hash(password, 10)


    const user = await userModel.create({
        email,
        username,
        name,
        phone,
        password: hashPassword,
        role: "USER",
        // countOfUsers > 0 ? "USER" : "ADMIN",
    })
    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, "password")

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
        {
            expiresIn: "30 day"
        })

    return res.status(201).json({ user: userObject, accessToken })


}


exports.login = async (req, res) => {
    const { identifier, password } = req.body

    const user = await userModel.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    })

    if (!user) {
        return res.status(401).json({ Message: "email or username not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ Message: "password not valid" })
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30day"
    })

    return res.json({accessToken})

}


exports.getMe = (req, res) => {

}
