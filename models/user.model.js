const mongoose = require('mongoose');
const { userTypes } = require('../utils/constants');


// create schema for user model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: [userTypes.customer, userTypes.theatreOwner, userTypes.admin],
        default: userTypes.customer
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }   
})


module.exports = mongoose.model("User", userSchema);