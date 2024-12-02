const { Project, Category } = require('../models/project.models');




const createCategory = async (req, res) => {

    const { title, slug, description, icon }= req.body;
 
    try {
        const existingCategory = await Category.find({ title });
        console.log(
            'this', existingCategory.length);

        if(existingCategory > 0) {
            return res.status(400).json({ success: false, message: 'Category with this title already exists'});
        };

        const newCategory = await new Category({
            title,
            slug,
            description,
            icon
        });

        await newCategory.save();

        return res.status(201).json({
            succe: true,
            data: newCategory,
            message: 'Category created succesfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};

const getAllCategories = async (req, res) => {

    try {
        const categories = await Category.find({});
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

const allProjects = async (req, res) => {

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

const createProject = async (req, res) => {
    try {
        const { 
            title,
            description,
            categoryId,
            organizationName,
            location,
            requiredSkills,
            duration,
            contactEmail,
            volunteerCount
         } = req.body;

        const newProject = new Project({
            title,
            description,
            categoryId,
            organizationName,
            location,
            requiredSkills,
            duration,
            contactEmail,
            volunteerCount
        });

        await newProject.save();

        return res.status(201).json({
            success: true,
            data: newProject 
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error
        });
    }

}

const updateProject = async (req, res) => {
    try {
        const {
            title,
            description,
            categoryId,
            organizationName,
            location,
            requiredSkills,
            duration,
            contactEmail,
            volunteerCount
         } = req.body;

       

        const checkProject = await Project.find({ title });
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

const deleteProject = async (req, res) => {
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

module.exports = {
    createCategory,
    getAllCategories,
    createProject,
    deleteProject,
    updateProject,
    allProjects
}
