const express = require("express")
const authMiddleware = require("../../middlewares/auth")
const isAdminMiddleware = require("../../middlewares/isAdmin")
const offsController = require("./../../controllers/v1/off")

const router = express.Router()

router.route("/")   
    .get(authMiddleware,isAdminMiddleware,offsController.getAll)
    .post(authMiddleware,isAdminMiddleware,offsController.create)

router.route("/all").post(authMiddleware,isAdminMiddleware,offsController.setOnAll)

router.route("/:code").post(authMiddleware,isAdminMiddleware,offsController.getOne)

router.route("/:id").delete(authMiddleware,isAdminMiddleware,offsController.remove)

module.exports = router