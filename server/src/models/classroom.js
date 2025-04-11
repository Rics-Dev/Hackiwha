const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema({
   name: {type: String, required: true},
   subject: {type:String, required:true},
   teacher: {type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
   students: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
   id: {type:String, unique:true}

}, {timesstamps: true})

module.exports = mongoose.model('Classroom', classroomSchema)