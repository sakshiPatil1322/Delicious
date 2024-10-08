require('dotenv').config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


async function connectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
}