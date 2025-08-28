// server/model/Project.js

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    liveDemoUrl: {
      type: String,
      trim: true
    },
    codeUrl: {
      type: String,
      trim: true
    },
    techStack: {
      type: [String],
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
