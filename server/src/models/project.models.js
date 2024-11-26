const mongoose = require('mongoose');

const ProjectSchemat = new mongoose.Schema({
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
    organizationName: { type: String },
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

