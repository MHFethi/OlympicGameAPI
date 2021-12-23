// Import dependencies that we need
const express = require('express');
// Import mongoose framework
const mongoose = require('mongoose');
// Body parser is a middleware which held to tidy up the request object before we use them
const bodyParser= require('body-parser')
// Morgan allow to log HTTP requests and error, and simplifies the process
const morgan = require('morgan');
// Import user-route to get all HTTP method from the controller
const userRoute = require('./routes/user-route')
// Build the application that it'll use to create our routes
const app = express();
// Import environnement variable for configuration
require('dotenv').config({path: '../.env'})

// Load Morgan middleware for HTTP logs
app.use(morgan('tiny'));

// Connection to the Mongodatabase
mongoose.connect(process.env.ATLAS_URI,
    {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass : process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connect to the database  !');
    })
    .catch(() => {
        console.log('Connexion to the database failed !');
    });


/*
* Header setup (CORS)
*
* allow to access to the API from random origin
* allow to send HTTP request between the both server (front and back)
* */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/api',(req,res) => {
    console.log("API is running");
})
// Load the UserRoute middleware with the URL 'api/user' specified in the 'user-route.js'
app.use('/api',userRoute);

module.exports = app;

