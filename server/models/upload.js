const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    receipeName: {
        type: String,
        required: true,
    },
    dishType: {
        type: String,
        required: true,
    },
    preprationTime: {
        type: Number,
        required: true,
        min: [0, 'Preparation time must be a positive number'],
    },
    servings: {
        type: Number,
        required: true,
        min: [1, 'Servings must be at least 1'],
    },
    cookingTime: {
        type: Number,
        required: true,
        min: [0, 'Cooking time must be a positive number'],
    },
    shelfLife: {
        type: Number,
        required: true,
        min: [0, 'Shelf life must be a positive number'],
    },
    images: [
        {
            url: {
                type: String,
                required: [true, 'Image URL is required'],
            },
            public_id: {
                type: String,
                required: [true, 'Image public_id is required'],
            },
        },
    ],
    ingredients: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'At least one ingredient is required',
        },
    },
    instructions: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'At least one instruction is required',
        },
    },
    createdBy: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
    }
}, { timestamps:true});

const UPLOAD = mongoose.model('upload', uploadSchema);

module.exports = UPLOAD;
