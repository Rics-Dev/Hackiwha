const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/ 
    },

    password: {
        type: String,
        required: true,
        minlength: 6 
    },
     
    role: {
        type: String,
        enum: ['Student ', 'Teacher'],
        required: true
    },


    firstName: {type: String, required: true},
    lastName: { type: String, required: true},
    



});

UserSchema.pre('save', async function(next) {
    if (!this.modifiedpass ('password')) return next()
        this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model('USER', userSchema)

