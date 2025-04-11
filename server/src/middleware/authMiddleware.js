const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.protect = async (req, res,next) => {
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.heqders.authorization.split('')  [1]
    }

    if (!token) {

        return res.status(401).json({error: 'not authorized'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findID(decoded.id)
        next()
    } catch (err) {
        res.status(401).json({error: 'invalid token'})
    }
}





exports.restrictTo = (...roles) => {
    return (req, res, next) => {
     if (!roles.includes(req.user.role)) {
        return res.status(403).json({error: 'access denied'})
     }  
     
     next()
    }
}