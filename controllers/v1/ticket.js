const departmentModel = require("../../models/department");
const departmentSubModel = require("../../models/department-sub");
const ticketModel = require("../../models/ticket");

exports.create = async (req, res) => {
  const { departmentID, departmentSubID, priority, title, body, course } =
    req.body;
  const ticketCreate = await ticketModel.create({
    departmentID,
    departmentSubID,
    priority,
    title,
    body,
    user: req.user._id,
    answer: 0,
    course,
    isAnswer: 0,
  });
  const findTicket = await ticketModel
    .findOne({ _id: ticketCreate._id })
    .populate("departmentID")
    .populate("departmentSubID")
    .populate("user")
    .lean();

  return res.status(201).json(findTicket);
};

exports.getAll = async (req, res) => {
    const allTicket = await ticketModel.find({ answer : 0 })
    .populate("departmentID" , "title")
    .populate("departmentSubID", "title")
    .populate("user" , "name")
    .lean()

    return res.json(allTicket)
};

exports.userTickets = async (req, res) => {};

exports.department = async (req, res) => {
  const departments = await departmentModel.find({});
  return res.json(departments);
};

exports.createDepartment = async (req, res) => {
  const { title } = req.body;
  const department = await departmentModel.create({ title });
  return res.json(department);
};

exports.createDepartmentSub = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const departmentSub = await departmentSubModel.create({ title, parent: id });
  return res.json(departmentSub);
};

exports.setAnswer = async (req, res) => {
  const { body, ticketId } = req.body;
  const ticket = await ticketModel.findOne({_id : ticketId}).lean()
  const answer = await ticketModel.create({
    departmentID : ticket.departmentID,
    departmentSubID : ticket.departmentSubID,
    priority : ticket.priority,
    title : "پاسخ به تیکت شما",
    body,
    user: req.user._id,
    answer: 0,
    parent : ticket._id,
    isAnswer: 1,
  })
  await ticketModel.findOneAndUpdate({_id : ticketId},{
    answer : 1
  })

  return res.json(answer)
};

exports.departmentSubs = async (req, res) => {
    const { id } = req.params;
    const departmentSub = await departmentSubModel.find({parent : id });
    return res.json(departmentSub);
};

exports.getAnswer = async (req, res) => {
  const {id} = req.params
  const ticket = await ticketModel.findOne({_id : id})
  const answerTicket = await ticketModel.findOne({parent : id})

  return res.json({ticket ,answerTicket: answerTicket ? answerTicket : null})
};
