const express = require('express');
const { createCategory, getProject, getAllCategories, allProjects, createProject, updateProject, deleteProject } = require('../controllers/project.controllers');
const { authMiddleware } = require('../middlewares/auth');

const projectRouter = express.Router();

projectRouter.post('/create-category', createCategory);

projectRouter.get('/get-category', getAllCategories);

projectRouter.get('/all-projects', allProjects);

projectRouter.get('/get-project/:projectId/', getProject);

projectRouter.post('/create-project', createProject);

projectRouter.put('/update-project/:id', updateProject);

projectRouter.delete('/delete-project/:id', deleteProject);

module.exports = { projectRouter };