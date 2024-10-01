const User = require("../models/user");
const {setUser} = require("../service/auth");

async function userSignup(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/");
}

async function userLogin(req,res){
    const {email,password}=req.body;
    const user = await User.findOne({email,password});

    if(!user){
        return res.render('login',{
            error : "Invalid Username or Password",
        });
    }

    const token = setUser({id: user._id,email: user.email});
    res.cookie("uid",token);
    return res.redirect("/");

//    jwt.sign({user},secretKey,{expiresIn: '300s'},(err,token) =>{
//     if(err){
//         return res.status(500).json({message: "Token generated fails"});
//     }
//     res.cookie('uid');
//     res.redirect('/');
//    })
}

module.exports={
    userSignup,
    userLogin,
}