const express = require('express');
const {handleGetReceipeByName } = require('../controllers/receipes.js');
const { handleIndexPage,handleReceipePostPage,handleUploadReceipe,handleContactPage,handleLoginPage,handleSignupPage} = require('../controllers/staticRouter');
router = express.Router();

router.get('/',handleIndexPage);
router.get('/index.ejs',handleIndexPage);
router.get("/upload-receipe.ejs",handleUploadReceipe);
router.get("/receipe-post.ejs",handleReceipePostPage);
router.get("/contact.ejs",handleContactPage);
router.get("/login",handleLoginPage);
router.get("/signup",handleSignupPage);

module.exports = router;