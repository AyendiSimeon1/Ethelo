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
    volunteerCount: { type: Number, required: true}

});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
    Category,
    Project
}