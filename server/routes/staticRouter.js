const express = require('express');
const { handleIndexPage,handleReceipePostPage,handleUploadReceipe,handleContactPage} = require('../controllers/staticRouter');
router = express.Router();

router.get('/',handleIndexPage);
router.get('/index.ejs',handleIndexPage);
router.get("/upload-receipe.ejs",handleUploadReceipe);
router.get("/receipe-post.ejs",handleReceipePostPage);
router.get("/contact.ejs",handleContactPage)

module.exports = router;