require('dotenv').config();

const express = require('express');
const app = express();

// init middlewares

// init db
require('./dbs/init.mongodb');

// handle errors

module.exports = app;