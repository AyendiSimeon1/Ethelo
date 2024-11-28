const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schmema({
    name : {
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
    description : {
        type: String,
        required: true,
        trim: true
    },
    categoryId : {
        type: mongoose.Schema.types.ObjectId,
        ref: 'Category',
        required: true,
    },
    organizationName: { type: String },
    location: { type: String },
    duration: { type: String, required: true },
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