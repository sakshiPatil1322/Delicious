const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

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
            filePath: String,  // Store the file path to the image
            contentType: String // Store the MIME type of the file
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
