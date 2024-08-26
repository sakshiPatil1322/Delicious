const UPLOAD = require('../models/upload'); // Your schema/model file
const multer = require('multer');

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Middleware function to handle uploads
async function handleUploads(req, res) {
    // Use upload.array() for handling multiple files
    upload.array('recipe_images')(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ error: err.message });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'At least one image is required.' });
        }

        const { recipe_name, dish_type, preparation_time, no_of_servings, cooking_time, shelf_life,ingredients,steps,your_name,email } = req.body;

        try {
            // Creating a new document in MongoDB
            await UPLOAD.create({
                receipeName: recipe_name,
                dishType: dish_type,
                preprationTime: preparation_time,
                servings: no_of_servings,
                cookingTime: cooking_time,
                shelfLife: shelf_life,
                images: req.files.map(file => ({
                    data: file.buffer,
                    contentType: file.mimetype
                })),
                ingredients: ingredients.split(','), // Assuming ingredients are sent as a comma-separated string
                instructions: steps.split(','), // Assuming instructions are sent as a comma-separated string
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
