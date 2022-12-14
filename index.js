require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes/post');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// To shorten the console.log function
const C = console.log.bind(console);

const port = process.env.DEFAULT_PORT || 500;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/image', routes);
app.use(cors());

// Start the express server
app.listen(port, () => {
  C(`Application is running at http://localhost:${port}`);
});

module.exports = C;
