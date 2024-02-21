const express = require('express');
const authMiddleware = require("../../middlewares/auth")
const commentsController = require("./../../controllers/v1/comment")

const router = express.Router();


router.route("/").post(authMiddleware, commentsController.create)


module.exports = router