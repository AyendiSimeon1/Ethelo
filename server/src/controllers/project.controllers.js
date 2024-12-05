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
            userId,
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
            userId,
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
            userId,
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

const getProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log('This is the project id :', projectId);

        const project = await Project.findOne({ _id: projectId });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project does not exist',
            });
        }


        return res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
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

const allApplications = async (req, res) => {
    try {
        const applications = await Application.find({ projectId: req.params.id });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
};

// Add a new application
const createApplication = async (req, res) => {
    try {
        const { userName, userEmail, projectId } = req.body;
        const newApplication = new Application({ userName, userEmail, projectId });
        await newApplication.save();
        res.status(201).json({ message: 'Application created', application: newApplication });
    } catch (error) {
        res.status(500).json({ message: 'Error creating application', error });
    }
};

const updateApplication = async (req, res) => {
    try {
        const { action } = req.body;
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        application.status = action === 'accept' ? 'Accepted' : 'Rejected';
        await application.save();
        res.json({ message: 'Application status updated', application });
    } catch (error) {
        res.status(500).json({ message: 'Error updating application', error });
    }
};


module.exports = {
    createCategory,
    getAllCategories,
    createProject,
    deleteProject,
    updateProject,
    allProjects,
    getProject,
    allApplications,
    createApplication,
    updateApplication
}
