const express = require('express')
const {protect, restrictTo} = require('../middleware/authMiddleware')
const {createClassroom} = require('../controllers/classroomController')
 
const router = express.Router()

router.post(
    '/'
    protect,
    restrictTo('teacher')
    createClassroom
)

module.exports = router

