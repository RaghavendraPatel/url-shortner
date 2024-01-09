//create express app
const express = require('express');
const app = express();
//import dotenv for environment variables
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
//import database configuration
const db = require('./config/mongoose.config');
const bodyParser = require('body-parser');

const md5 = require('md5')

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//import passport for authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/',require('./routes/index'));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});