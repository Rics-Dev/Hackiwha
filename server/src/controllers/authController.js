
const {User } = require('../models/User')
const jwt = require('jsonwebtoken')

const signToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

 
exports.signup = async (req , res , next) => {

    const {email, password, role, firstName, lastName} = req.body

    if (!email || !password || !role || !firstName || !lastName  ) {

        return res.satatus(400).json({error: 'fill the fields'})
    }

const user = await User.create({
    email,
    password,
    role,
    firstName,
    lastName,

})

const token = signToken(user._id, user.role)

res.status(201).json({token, role: user.role})

}






exports.signin = async (req, res, next) => {
    const {email, password} = req.body

const user = await User. findOne({email}).select('+password')

if(!user) {
    return res.status(401).json({error: 'invalid email or password'})

}

const  iscorrect = await bcrypt.compare(password, user.password)
if (!iscorrect) {
    return res.status(401).json({error: 'invalid amail or password'})
}

const token = signToken(user._id, user.role) 


res.json({token, role: user.role})




}
