const express = require("express");

const {handleUploads} = require('../controllers/upload.js');

const router = express.Router();

router.post('/',handleUploads);

module.exports = router;