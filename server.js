const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');


const port = process.env.PORT || 3000;

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler); // Error handler at the end

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
