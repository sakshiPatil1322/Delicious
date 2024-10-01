const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { connectToMongoDB } = require("./connections");
const staticRoutes = require('./server/routes/staticRouter');
const uploadRoutes= require('./server/routes/upload');
const receipesRoutes = require('./server/routes/receipes');
const userRouter = require('./server/routes/user');
const { restrictToLoggedinUserOnly } = require('./server/middlewares/auth');
const contactRoute = require('./server/routes/contact');
const logoutRoutes = require('./server/routes/userLogout'); 

const app = express();
const PORT = process.env.PORT || 7307;

connectToMongoDB('mongodb://127.0.0.1:27017/receipeWeb')
.then(()=>console.log("mongoDb connected succesfully..."))
.catch((error)=>console.log("mongDb can't connect",error));

require('dotenv').config();

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',staticRoutes);
app.use('/upload',restrictToLoggedinUserOnly,uploadRoutes);
app.use('/receipe-post.ejs',receipesRoutes);
app.use('/user',userRouter);
app.use('/contact',contactRoute);
app.use('/logout', logoutRoutes); // Use logout route

app.listen(PORT,() => console.log(`Server is started on Port ${PORT}`))