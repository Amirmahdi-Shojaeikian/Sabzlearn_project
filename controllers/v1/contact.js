const { default: mongoose } = require("mongoose")
const contactModel = require("./../../models/contact")
const nodemailer = require("nodemailer");

exports.getAll = async (req, res) => {
    const contacts = await contactModel.find({})
    return res.json(contacts)
}
exports.create = async (req, res) => {
    const {name,email,phone,body,} = req.body
    const contact = await contactModel.create({
        name,
        email,
        phone,
        body,
        isAnswer: 0
    })
    return res.json(contact)
}
exports.remove = async (req, res) => {
   const  isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id)
   if (!isValidObjectId){
    return res.json({message : "Invalid id"})
   }
   const removedContact = await contactModel.findOneAndDelete({_id : req.params.id})

   if (!removedContact){
    return res.json({message: "not found contact"})
   }

   return res.json(removedContact)
}
exports.answer = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "amirmahdi.kian003@gmail.com",
            pass: "rxus qacj nnzq aaxb"
        }
    })

    const mailOptions = {
        from: "amirmahdi.kian003@gmail.com",
        to : req.body.email,
        subject : "پاسخ به درخواست شما ",
        text : req.body.answer 
    }

    transporter.sendMail(mailOptions, async (err , info)=>{
        if (err){
            return res.json({message : err})
        }else{
            const contact = await contactModel.findOneAndUpdate({email: req.body.email},{
                isAnswer : 1
            })
            return res.json({message : "email send successfully "})
        }
    })
}