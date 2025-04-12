const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');


router
  .route('/')
  .get(classroomController.getMyClassrooms)
  .post(classroomController.createClassroom);

router
  .route('/:id')
  .get(classroomController.getClassroom)
  .put(classroomController.updateClassroom)
  .delete(classroomController.deleteClassroom);

router.post('/:id/invite', classroomController.inviteStudent);
router.post('/:id/assignments', classroomController.addAssignment);
router.post('/:id/submissions', classroomController.submitAssignment);

module.exports = router;