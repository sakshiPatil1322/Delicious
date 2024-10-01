const express = require('express');

const { sendMail } = require('../controllers/contact');

const router = express.Router();

router.post("/", sendMail);

module.exports = router;
