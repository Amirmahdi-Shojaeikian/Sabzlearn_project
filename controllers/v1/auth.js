const userModel = require("../../models/user")
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
    
    // const countOfUsers = await userModel.count();
    
    const hashPassword = await bcrypt.hash(password,10)


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
    Reflect.deleteProperty(userObject,"password")

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
        {
            expiresIn: "30 day"
        })

    return res.status(201).json({ user:userObject, accessToken })


}


exports.login = (req, res) => {

}


exports.getMe = (req, res) => {

}
