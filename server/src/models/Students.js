const mongoose = require('mongoose')

const StudentsSchema = new mongoose.Schema ({
    email : { type: String, required: true, unique: true},
    password: { type: String, required: true  },
    role: {type: String, default:'student'},

}, {timestamps : true});
module.exports = mongoose.model('Students',StudentsSchema )
