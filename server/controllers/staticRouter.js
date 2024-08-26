
const handleIndexPage = async(req,res) => {
    res.render('index');
}

const handleReceipePostPage = async(req,res) => {
    res.render('receipe-post');
}

const handleUploadReceipe= async(req,res) => {
    res.render('upload-receipe');
}

const handleContactPage = async(req,res) => {
    res.render('contact');
}

module.exports={
    handleIndexPage,
    handleReceipePostPage,
    handleUploadReceipe,
    handleContactPage,
}