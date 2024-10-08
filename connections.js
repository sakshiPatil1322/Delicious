require('dotenv').config();
const mongoose = require("mongoose");

async function connectToMongoDB() {
    const mongoURI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(mongoURI); // No options needed
        console.log("MongoDB connected successfully...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; // Rethrow the error to be handled in index.js
    }
}

module.exports = {
    connectToMongoDB,
};
