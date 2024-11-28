const { Project, Category } = require('../models/project.models');

export const createCategory = async (req, res) => {

    const { formData }= req.body;
    const title = formData.title;

    try {
        existingCategory = await Category.find({ title });

        if(existingCategory) {
            return res.status(400).json({ success: false, message: 'Category with this title already exists'});
        };

        const category = new Category({
            formData
        });

        category.save();

        return res.status(201).json({
            succe: true,
            data: formData,
            message: 'Category created succesfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};

export const getAllCategories = async (req, res) => {

    try {
        const categories = Category.find();
        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};

export const getAllProjects = async (req, res) => {

    try {
        const projects = await Project.find();
        return res.status(200).json({
            success: true,
            data: projects
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message
        });
    }
}

export const createProject = async (req, res) => {
    try {
        const { data } = req.body;

        const newProject = await new Project({
            data
        });
        return res.status(201).json({
            success: true,
            data: newProject 
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error?.messagee
        });
    }

}

export const updateProject = async (req, res) => {
    try {
        const { data } = req.body;

        req.query = { projectId };

        const checkProject = await Project.find({ projectId });
        if(!checkProject) {
            return res.status(400).json({
                success: false,
                message: 'Project does not exist'
            });
        };

        const updatedProject = await Project.findByIdAndUpdate({ projectId }, {
            data
        });

        return res.status(201).json({
            success: true,
            message: updatedProject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message 
        });
    }
    
};

export const deleteProject = async (req, res) => {
    const { projectId } = req.query;

    const checkProject = await Project.find({ projectId });
    if(!checkProject) {
        return res.status.json({
            success: false,
            message: 'Project does not exist'
        });
    }
    const deleteProjected = await Project.findByIdAndDelete(projectId);
    return res.status(200).json({
        succes: true,
        message: 'Project deleted successfully'
    });
};

