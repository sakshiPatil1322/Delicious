const express = require("express");

const {handleUploads, upload} = require('../controllers/upload.js');

const router = express.Router();

router.post('/',upload.array("recipe_images", 10), handleUploads);

module.exports = router;