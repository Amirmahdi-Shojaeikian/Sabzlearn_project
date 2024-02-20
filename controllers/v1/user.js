const userModel = require("../../models/user")
const banUserModel = require("./../../models/ban_phone")
const bcrypt = require("bcrypt")
const {isValidObjectId} = require("mongoose")



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

exports.getAll = async (req, res) => {
    const user = await userModel.find({},"-password")

    res.json(user)
}

exports.removeUser = async (req, res) => {
    const isValidUserID = isValidObjectId(req.params.id);
    

    if (!isValidUserID) {
      return res.status(409).json({
        message: "User ID is not valid !!",
      });
    }
  
    const removedUser = await userModel.findOneAndDelete({ _id: req.params.id });
  
    if (!removedUser) {
      return res.status(404).json({
        message: "There is no user !!",
      });
    }
  
    return res.status(200).json({
      message: "User Removed Successfully :))",
    });
  };

  exports.changeRole = async (req, res) => {
    const {id} = req.body
    const isValidUserID = isValidObjectId(id);
    
    if (!isValidUserID) {
      return res.status(409).json({
        message: "User ID is not valid !!",
      });
    }

    const user = await userModel.findOne({_id : id})

    let newRole = user.role == "ADMIN" ? "USER" : "ADMIN"

    const updateUser = await userModel.findByIdAndUpdate({_id : id},{
        role : newRole
    })

    if (updateUser) {
        return res.json({
            message : "user role changes successfully :))"
        })
    }

  }


  exports.UpdateUser = async(req,res) => {
    const {name , username,email ,password ,phone } = req.body

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.findByIdAndUpdate({_id : req.user._id},{
        name,
        username,
        email,
        password : hashedPassword,
        phone
    }).select("-password").lean()

    return res.json({user})

  }