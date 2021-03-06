const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        recuired: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [{
        title: {
            type: String,
            recuired: true
        },
        company: {
            type: String,
            recuired: true
        },
        location: {
            type: String
        },
        from: {
            type: Date,
            recuired: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type: String,
            recuired: true
        },
        college: {
            type: String,
            recuired: true
        },
        degree: {
            type: String,
            recuired: true
        },
        fieldofstudy: {
            type: String,
            recuired: true
        },
        from: {
            type: Date,
            recuired: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social: [{
        facebook: {
            type: String
        },
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    }],

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);