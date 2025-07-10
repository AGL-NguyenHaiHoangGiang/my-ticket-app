require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const adminAuthRoutes = require('./routes/admin.auth.routes');
const adminEventRoutes = require('./routes/admin.event.routes');

const app = express();

// init middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// init db
require('./dbs/init.mongodb');

// handle errors

//routes
app.use('/api/v0/auth', authRoutes);
app.use('/api/v0/event', eventRoutes);
app.use('/api/v0/admin/auth', adminAuthRoutes);
app.use('/api/v0/admin/event', adminEventRoutes);

module.exports = app;