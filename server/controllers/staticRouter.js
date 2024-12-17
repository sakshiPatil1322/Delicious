const Uploads = require('../models/upload');

const handleIndexPage = async (req, res) => {
    const events = await Uploads.find({}).sort({ createdAt: -1 }).limit(6); // Sort by creation time in descending order and limit to 6
    const receipe = await Uploads.find({});
    res.render('index', { events ,receipe,cookies: req.cookies});
}

const handleReceipePostPage = async(req,res) => {
    const receipes = [];
    res.render('receipe-post', { receipes ,cookies: req.cookies});
}

const handleUploadReceipe= async(req,res) => {
    res.render('upload-receipe',{cookies: req.cookies});
}

const handleContactPage = async(req,res) => {
    res.render('contact',{cookies: req.cookies});
}

const handleSignupPage = async(req,res) => {
    res.render('signup');
}

const handleLoginPage = async(req,res) => {
    res.render('login');
}

const handleProfile = async(req,res) => {
    res.render('profile',{cookies: req.cookies});
}

module.exports={
    handleIndexPage,
    handleReceipePostPage,
    handleUploadReceipe,
    handleContactPage,
    handleSignupPage,
    handleLoginPage,
    handleProfile
}

