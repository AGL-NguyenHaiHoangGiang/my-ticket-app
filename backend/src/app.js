require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(bodyParser.json());

// init middlewares

// init db
require('./dbs/init.mongodb');

// handle errors

//routes
app.use('/api/v0/auth', authRoutes);

module.exports = app;