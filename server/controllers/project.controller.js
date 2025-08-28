// server/controllers/projectController.js

import Project from '../models/Project.js';
import { getPagination } from '../utils/pagination.js';

// GET /api/projects
export const getAllProjects = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [total, projects] = await Promise.all([
      Project.countDocuments(),
      Project.find().skip(skip).limit(limit)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: projects,
      meta: {
        total,
        page,
        totalPages,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
