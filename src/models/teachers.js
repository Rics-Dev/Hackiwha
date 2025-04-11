const mongoose = require('mongoose')

const TeachersSchema = new mongoose.Schema ({
    email : { type: String, required: true, unique: true},
    password: { type: String, required: true  },
    role: {type: String, default:'teacher'},

}, {timestamps : true});
module.exports = mongoose.model('Teachers',TeachersSchema )