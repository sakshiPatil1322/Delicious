const { time } = require('console');
const multer = require('multer');
const path = require('path');
const UPLOAD = require("../models/upload");

// Configure multer for disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where you want to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid name collisions
    }
});

const upload = multer({ storage: storage });

// Middleware function to handle uploads
async function handleUploads(req, res) {
    // Use upload.array() to handle multiple files
    upload.array('recipe_images', 10)(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ error: err.message });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required.' });
        }

        const { recipe_name, dish_type, preparation_time, no_of_servings, cooking_time, shelf_life, ingredients, steps, your_name, email } = req.body;

        try {
            // Save the file paths to MongoDB, not the actual files
            await UPLOAD.create({
                receipeName: recipe_name,
                dishType: dish_type,
                preprationTime: preparation_time,
                servings: no_of_servings,
                cookingTime: cooking_time,
                shelfLife: shelf_life,
                images: req.files.map(file => ({
                    filePath: file.path, // Store the file path
                    contentType: file.mimetype // Store the mime type for the image
                })),
                ingredients: ingredients.split(','), // Assuming ingredients are sent as a comma-separated string
                instructions: steps.split(','), // Assuming steps are sent as a comma-separated string
                createdBy: your_name,
                email: email,
            });

            res.status(200).redirect('/');
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    });
}

module.exports = {
    handleUploads,
};
