const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema=new mongoose.Schema({
    name:{
        type : String,
        require : true,
    },
    email:{
        type : String,
        require : true,
        unique : true,
    },
    password:{
        type : String,
        require : true,
    }
},{timestamps : true});

const User = mongoose.model('user',userSchema);

module.exports = User;