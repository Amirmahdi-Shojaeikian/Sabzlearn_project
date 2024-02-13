const express = require("express")
const userController = require("./../../controllers/v1/user")

const router = express.Router()


router.route("/ban/:id").post(userController.banUser)


module.exports = router