const express = require("express");
const { handleReceipes, handleGetReceipeByName } = require('../controllers/receipes.js');

const router = express.Router();

router.get('/', handleReceipes);

// Use the name parameter to search the recipe by name
router.get('/:name', handleGetReceipeByName);

module.exports = router;
