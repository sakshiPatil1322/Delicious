const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const bodyParser = require('body-parser');

const { connectToMongoDB } = require("./connections");
const staticRoutes = require('./server/routes/staticRouter');
const uploadRoutes= require('./server/routes/upload');

// const {connectToMongoDB} = require('./connections');
const {mongoose} = require("mongoose");

const app = express();
const PORT = process.env.PORT || 7006;

connectToMongoDB('mongodb://127.0.0.1:27017/receipeWeb')
.then(()=>console.log("mongoDb connected succesfully..."))
.catch((error)=>console.log("mongDb can't connect",error));

require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(expressLayouts);

app.set('view engine', 'ejs');
// app.set('layout','./layouts/home');

app.use('/',staticRoutes);
app.use('/upload',uploadRoutes)

app.listen(PORT,() => console.log(`Server is started on Port ${PORT}`))