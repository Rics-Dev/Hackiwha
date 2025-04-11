const Classroom = require('../models/classroom')
exports.createClassroom = async (req , res) => {
    const classroom = await Classroom.create({
     
        name: "Mathematics",
       subject: "math" ,
        teacher: req.user.id,
        id: Math.random().toString(36).substring(2,8).toUpperCase()

     

    
    })
    res.status(201).json(classroom)
}

exports.joinClassroom = async (req, res) => {

    const classroom = await Classroom.findOneAndUpdate(
{ inviteCode: req.body.id},
{$addToSet: {students: req.user.id}},
{new: true}

    )

    res.json(classroom)
}