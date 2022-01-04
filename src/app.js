// Import dependencies that we need
const express = require('express');

const path = require("path");
// Import mongoose framework for db connexion
const {connect} = require('mongoose');

// Body parser is a middleware which held to tidy up the request object before we use them
const bodyParser= require('body-parser');

// Morgan allow to log HTTP requests and error, and simplifies the process
const morgan = require('morgan');

// Import all route to get all HTTP method from the controller
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');
const genderRoute = require('./routes/gender-route');
const countryRoute = require('./routes/country-route');
const sportRoute = require('./routes/sport-route');
const athleteRoute = require('./routes/athlete-route');

// Build the application that it'll use to create our routes
const app = express();
app.use(express.static('../assets'));

// Import environnement variable for configuration
require('dotenv').config({path:'../.env'});
// Load Morgan middleware for HTTP logs
app.use(morgan('tiny'));
//Set render engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('index');
})
// Connection to the Mongodatabase
connect(process.env.ATLAS_URI,
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
        console.log('Connection to the database failed !');
        console.log(process.env.DB_USER);
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

// Load the routes middleware with the right URL specified in the route files
app.use('/api', authRoute);
app.use('/api/users',userRoute);
app.use('/api/sports',sportRoute);
app.use('/api/athletes',athleteRoute)
app.use('/api/genders',genderRoute);
app.use('/api/countries', countryRoute);

module.exports = app;

