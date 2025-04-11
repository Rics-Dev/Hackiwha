const {registerStudents} = require('../services/authservice')
const {registerteachers} = require('../services/authservices')
 

const register = async ( req , res) => {
    const {email, password, role} = req.body

    try {
        const student = await registerStudents ( email, password, role)
        res.sattus(201).json({success: true, student})

    } catch (err) {
        res.sattus(400).json({success: false, error: err.message})
    }


    try {
        const teacher = await registerteacher ( email, password, role)
        res.sattus(201).json({success: true, teacher})

    } catch (err) {
        res.sattus(400).json({success: false, error: err.message})
    }
}

module.exports = { register}