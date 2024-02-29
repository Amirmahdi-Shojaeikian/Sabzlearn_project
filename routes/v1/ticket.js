const express = require("express");
const ticketsController = require("./../../controllers/v1/ticket");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, ticketsController.create)
  .get(authMiddleware, ticketsController.getAll);

router.route("/user").get(authMiddleware, ticketsController.userTickets);

router
  .route("/department")
  .get(authMiddleware, ticketsController.department)
  .post(authMiddleware, isAdminMiddleware, ticketsController.createDepartment);

router
  .route("/department/:id/departmentSubs")
  .post(authMiddleware, ticketsController.createDepartmentSub);

router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, ticketsController.setAnswer);

router
  .route("/department/:id/subs")
  .get(authMiddleware, ticketsController.departmentSubs);

router.route("/:id/answer").get(authMiddleware, ticketsController.getAnswer);

module.exports = router;
