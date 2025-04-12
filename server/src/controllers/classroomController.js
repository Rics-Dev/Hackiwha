const Classroom = require('../models/Classroom');
const User = require('../models/User');
const Resource = require('../models/Resource');

// Create a new classroom
exports.createClassroom = async (req, res) => {
  try {
    const { name, description, subject } = req.body;

    if (!name || !subject) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Name and subject are required' },
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
    }

    const classroom = await Classroom.create({
      name,
      description,
      subject,
      teacherId: req.user.id,
      students: [],
    });

    res.status(201).json({
      success: true,
      data: {
        classroom: {
          _id: classroom._id.toString(),
          name: classroom.name,
          description: classroom.description,
          subject: classroom.subject,
          teacherId: classroom.teacherId,
          students: classroom.students,
          assignments: classroom.assignments,
          resources: classroom.resources,
          createdAt: classroom.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

// Get all classrooms for the authenticated user
exports.getMyClassrooms = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
    }

    const classrooms = await Classroom.find({
      $or: [{ teacherId: req.user.id }, { students: req.user.id }],
    }).populate('teacherId', 'name email');

    res.json({
      success: true,
      data: {
        classrooms: classrooms.map(classroom => ({
          _id: classroom._id.toString(),
          name: classroom.name,
          description: classroom.description,
          subject: classroom.subject,
          teacherId: classroom.teacherId,
          students: classroom.students,
          assignments: classroom.assignments,
          resources: classroom.resources,
          createdAt: classroom.createdAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

// Get single classroom
exports.getClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id)
      .populate('teacherId', 'name email')
      .populate('students', 'name email')
      .populate('resources');

    if (!classroom) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Classroom not found' },
      });
    }

    // Check if user is authorized (teacher or student in the classroom)
    if (
      classroom.teacherId._id.toString() !== req.user.id &&
      !classroom.students.some(student => student._id.toString() === req.user.id)
    ) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Not authorized to access this classroom' },
      });
    }

    res.json({
      success: true,
      data: {
        classroom: {
          _id: classroom._id.toString(),
          name: classroom.name,
          description: classroom.description,
          subject: classroom.subject,
          teacherId: classroom.teacherId,
          students: classroom.students,
          assignments: classroom.assignments,
          resources: classroom.resources,
          createdAt: classroom.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

// Update classroom
exports.updateClassroom = async (req, res) => {
  try {
    const { name, description, subject } = req.body;

    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Classroom not found' },
      });
    }

    if (classroom.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only the teacher can update the classroom' },
      });
    }

    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { name, description, subject },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: {
        classroom: {
          _id: updatedClassroom._id.toString(),
          name: updatedClassroom.name,
          description: updatedClassroom.description,
          subject: updatedClassroom.subject,
          teacherId: updatedClassroom.teacherId,
          students: updatedClassroom.students,
          assignments: updatedClassroom.assignments,
          resources: updatedClassroom.resources,
          createdAt: updatedClassroom.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

// Delete classroom
exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Classroom not found' },
      });
    }

    if (classroom.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only the teacher can delete the classroom' },
      });
    }

    await classroom.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

// Invite student to classroom
exports.inviteStudent = async (req, res) => {
  try {
    const { email } = req.body;
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Classroom not found' },
      });
    }

    if (classroom.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only the teacher can invite students' },
      });
    }

    const student = await User.findOne({ email });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'Student not found' },
      });
    }

    if (classroom.students.includes(student._id)) {
      return res.status(400).json({
        success: false,
        error: { code: 'ALREADY_ENROLLED', message: 'Student is already enrolled' },
      });
    }

    classroom.students.push(student._id);
    await classroom.save();

    res.json({
      success: true,
      data: {
        classroom: {
          _id: classroom._id.toString(),
          name: classroom.name,
          description: classroom.description,
          subject: classroom.subject,
          teacherId: classroom.teacherId,
          students: classroom.students,
          assignments: classroom.assignments,
          resources: classroom.resources,
          createdAt: classroom.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

// Add assignment
exports.addAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, resourceLinks } = req.body;
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Classroom not found' },
      });
    }

    if (classroom.teacherId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only the teacher can add assignments' },
      });
    }

    classroom.assignments.push({
      title,
      description,
      dueDate,
      resourceLinks,
      submissions: [],
    });

    await classroom.save();

    res.json({
      success: true,
      data: {
        classroom: {
          _id: classroom._id.toString(),
          name: classroom.name,
          description: classroom.description,
          subject: classroom.subject,
          teacherId: classroom.teacherId,
          students: classroom.students,
          assignments: classroom.assignments,
          resources: classroom.resources,
          createdAt: classroom.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

// Submit assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { content, assignmentId } = req.body;
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Classroom not found' },
      });
    }

    if (!classroom.students.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only enrolled students can submit assignments' },
      });
    }

    const assignment = classroom.assignments.id(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Assignment not found' },
      });
    }

    assignment.submissions.push({
      studentId: req.user.id,
      content,
      submittedAt: new Date(),
    });

    await classroom.save();

    res.json({
      success: true,
      data: {
        classroom: {
          _id: classroom._id.toString(),
          name: classroom.name,
          description: classroom.description,
          subject: classroom.subject,
          teacherId: classroom.teacherId,
          students: classroom.students,
          assignments: classroom.assignments,
          resources: classroom.resources,
          createdAt: classroom.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};