const express = require('express');
const authMiddleware = require("../../middlewares/auth")
const isAdminMiddleware = require("../../middlewares/isAdmin")
const multer = require("multer")
const multerStorage = require("./../../utils/uploader")
const coursesController = require("./../../controllers/v1/course");
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route("/").post(multer({ storage: multerStorage, limits: { fileSize: 10000000 } }).single(
    "cover"
), authMiddleware, isAdminMiddleware, coursesController.create)

router.route("/:id/sessions").post(multer({ storage: multerStorage, limits: { fileSize: 10000000 } }).single(
    "cover"
), authMiddleware, isAdminMiddleware, coursesController.createSession)

router.route("/sessions").get(authMiddleware, isAdminMiddleware, coursesController.getAll)
router.route("/:href/:sessionsId").get(coursesController.getSession)
router.route("/sessions/:id").delete(authMiddleware, isAdminMiddleware, coursesController.removeSession)

module.exports = router;