const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Classroom name is required'],
      trim: true,
      maxLength: [100, 'Classroom name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, 'Description cannot exceed 500 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Teacher is required'],
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    assignments: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        dueDate: {
          type: Date,
        },
        resourceLinks: [
          {
            type: String,
          },
        ],
        submissions: [
          {
            studentId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            content: {
              type: String,
            },
            submittedAt: {
              type: Date,
              default: Date.now,
            },
            grade: {
              type: Number,
            },
            feedback: {
              type: String,
            },
          },
        ],
      },
    ],
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
      },
    ],
  },
  {
    timestamps: true,
  }
);

classroomSchema.index({ name: 1, teacherId: 1 });

module.exports = mongoose.model('Classroom', classroomSchema);