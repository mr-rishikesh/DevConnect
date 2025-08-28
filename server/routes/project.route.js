// server/routes/projectRoutes.js

import express from 'express';
import { getAllProjects, createProject } from '../controllers/project.controller.js';

const projectRouter = express.Router();

// @route   GET /api/projects?page=1&limit=10
// @desc    Get all projects with pagination
projectRouter.get('/', getAllProjects);

// @route   POST /api/projects
// @desc    Create a new project
projectRouter.post('/', createProject);

export default projectRouter;
