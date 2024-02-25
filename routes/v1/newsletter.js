const express = require("express")
const authMiddleware = require("../../middlewares/auth")
const isAdminMiddleware = require("../../middlewares/isAdmin")
const newslettersController = require("./../../controllers/v1/newsletter")

const router = express.Router()

router.route("/").get(authMiddleware,isAdminMiddleware,newslettersController.getAll)

router.route("/").post(newslettersController.create)

module.exports = router