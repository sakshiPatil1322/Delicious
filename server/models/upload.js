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
    },
    servings: {
        type: Number,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    shelfLife: {
        type: Number,
        required: true,
    },
    images: [ 
        {
            data: Buffer,
            contentType: String
        }
    ],
    ingredients: [String],
    instructions: [String],
    createdBy: {
        type: String,
    },
    email: {
        type: String,
    }
}, { timestamps: true });

const UPLOAD = mongoose.model('upload', uploadSchema);

module.exports = UPLOAD;
