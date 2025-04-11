const student = require('../models/User')
const teacher = require('../models/teachers')

const registerStudents = async (email, password, role) => {
    try {
        const student = new Student ({email, password, role})
        await student.save()
        return student
    } catch (err) {
        throw err
    }
}

const registerTeachers = async (email, password, role) => {
    try {
        const teacher = new Teacher ({email, password, role})
        await teacher.save()
        return teacher
    } catch (err) {
        throw err
    }
}