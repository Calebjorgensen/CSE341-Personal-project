const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

require('./config/passport');


const port = process.env.PORT || 3000;

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler); // Error handler at the end

app.use(
  session({
    secret: process.env.SESSION_SECRET,  // Using environment variable
    resave: false,
    saveUninitialized: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());


// Middleware for CORS (Access Control)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Use the routes defined in ./routes
app.use('/', require('./routes'));

// Initialize DB and start the server
mongodb.initDb((err, db) => {
  if (err) {
    console.log('Error connecting to DB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});