const express = require("express")
const multer = require("multer")
const articlesController = require("./../../controllers/v1/article")
const authMiddleware = require("../../middlewares/auth")
const isAdminMiddleware = require("../../middlewares/isAdmin")
const multerStorage = require("../../utils/uploader")

const router = express.Router()

router
    .route("/")
    .get(articlesController.getAll)
    .post(
        authMiddleware,
        isAdminMiddleware,
        // multer({storage : multerStorage , limits : {  fileSize : 10000000  }}).single("cover"),
        articlesController.create)

    

router.route("/:href").get(articlesController.getOne)


router.route("/draft").post(
    authMiddleware,
    isAdminMiddleware,
    // multer({storage : multerStorage , limits : {  fileSize : 10000000  }}).single("cover"),
    articlesController.saveDraft
    )
router
    .route("/:id")
    .delete(authMiddleware,isAdminMiddleware,articlesController.remove)
    .put(authMiddleware,isAdminMiddleware,articlesController.update)


module.exports = router