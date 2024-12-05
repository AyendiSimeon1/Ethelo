const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    slug : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    icon : {
        type: String,
        required: true
    },
});


const Category = mongoose.model('Category', CategorySchema);

const ProjectSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    organizationName: { type: String },
    location: { type: String },
    duration: { type: String, required: false },
    requiredSkills : {
        type: [String],
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    volunteerCount: { type: Number, required: true},
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }, 
    additionalRequirements: { type: String },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },

});

const applicationSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phone: { type: String, required: true }, 
    address: { type: String, required: true }, 
    age: { type: Number, required: true }, 
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    skills: [{ type: String }], 
    motivation: { type: String },
    experience: { type: String },
    status: { 
        type: String, 
        enum: ['Pending', 'Accepted', 'Rejected'], 
        default: 'Pending' 
    }, 
    appliedOn: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
    Category,
    Project
}