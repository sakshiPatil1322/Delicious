const UPLOAD = require('../models/upload');
const axios = require('axios'); // You'll need this to fetch data from the external API

async function handleReceipes(req, res) {
    const receipes = [];
    res.render('receipe-post', { receipes, cookies: req.cookies });
}

async function handleGetReceipeByName(req, res) {
    try {
        const receipeName = req.params.name;
        // First, search the database for the recipe
        let receipes = await UPLOAD.find({ receipeName: receipeName });
        receipes.forEach(receipe => {
            receipe.instructions = receipe.instructions.map(instruction =>
                instruction.replace(/^[\[\s"]*|[\s"\]]*$/g, '')
                // Remove extra quotes
            );
        });
        
        if (receipes.length === 0) {
            // If no recipes are found in the database, fetch from external API
            const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${receipeName}`;
            const apiResponse = await axios.get(apiUrl);
            const apiReceipe = apiResponse.data.meals;

            if (apiReceipe) {
                // Format the data to match the structure of your existing database format
                receipes = apiReceipe.map(meal => ({
                    receipeName: meal.strMeal,
                    dishType: meal.strCategory,
                    preprationTime: 'Not provided', // The API doesn't provide this, so we set a default value
                    cookingTime: 'Not provided',    // The API doesn't provide this either
                    servings: 'Not provided',       // No servings data in API
                    instructions: meal.strInstructions.split('\r\n').filter(instruction => instruction), // Splitting the instructions into an array
                    ingredients: [
                        `${meal.strIngredient1} ${meal.strMeasure1}`,
                        `${meal.strIngredient2} ${meal.strMeasure2}`,
                        `${meal.strIngredient3} ${meal.strMeasure3}`,
                        // Add other ingredients as needed
                    ].filter(ingredient => ingredient.trim() !== ''), // Filter out empty ingredients
                    images: [{ filePath: meal.strMealThumb }],
                    createdBy: 'API', // Mark that this came from the API
                    email: 'noreply@api.com', // Default email
                }));
            }
        }

        // Render the page with the found recipes (either from DB or API)
        res.render('receipe-post.ejs', { receipes, cookies: req.cookies });
    } catch (error) {
        console.error("Error fetching recipes", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    handleReceipes,
    handleGetReceipeByName,
};
