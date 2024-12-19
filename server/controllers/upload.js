const path = require('path');
const UPLOAD = require("../models/upload");
require('dotenv').config();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "recipe_images", // Cloudinary folder
        format: async (req, file) => "png", // Save files as PNG
        public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique file name
    },
});

const upload = multer({ storage: storage });

// Middleware function to handle uploads
async function handleUploads(req, res) {
    try {
        const { recipe_name, dish_type, preparation_time, no_of_servings, cooking_time, shelf_life, ingredients, steps, your_name, email } = req.body;

        // Collect the image URLs and public IDs from the uploaded files
        const uploadedImages = req.files.map(file => ({
            url: file.path, // Cloudinary URL automatically stored by multer-storage-cloudinary
            public_id: file.filename, // Cloudinary public ID automatically stored
        }));

        // Create the recipe document with the image URLs
        await UPLOAD.create({
            receipeName: recipe_name,
            dishType: dish_type,
            preprationTime: preparation_time,
            servings: no_of_servings,
            cookingTime: cooking_time,
            shelfLife: shelf_life,
            images: uploadedImages, // Save image URLs
            ingredients: ingredients.split(","), // Assuming comma-separated string
            instructions: steps.split(","), // Assuming comma-separated string
            createdBy: your_name,
            email: email,
        });

        res.status(200).redirect("/"); // Redirect after successful upload
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    handleUploads,
    upload // Export the multer upload middleware for use in routes
};
