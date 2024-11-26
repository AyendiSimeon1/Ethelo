const express = require('express');
const { getProject, createProject, updateProject, deleteProject } = require('.,/controllers/project.controllers');
const { authMiddleware } = require('../middlewares/auth');

const projectRouter = express.Router();

projectRouter.get('/all-projects', allProjects);

projectRouter.get('/projects/:id/', getProject);

projectRouter.post('/create-project', createProject);

projectRouter.put('/update-project/:id', updateProject);

projectRouter.delete('/delete-project/:id', deleteProject);

module.exports = { projectRouter };