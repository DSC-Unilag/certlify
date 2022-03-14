// Import dependencies
const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const cors = require('cors');

const appRoutes = require('../routes/app');
const authRoutes = require('../routes/auth');
const certRoutes = require('../routes/certificates');
const userRoutes = require('../routes/user');
const { RequireAuth } = require('../middlewares/RequireAuth');

exports.SetRoutes = (app) => {
    app.use(express.json({
        limit: '10mb'
    }));

    app.use(urlencoded({
        extended: true
    }));

    app.use(cors());

    let pathPrefix = '/api/v2/';

    app.use(`${pathPrefix}`, appRoutes);
    app.use(`${pathPrefix}auth`, authRoutes);
    app.use(`${pathPrefix}certificates`, certRoutes);
    app.use(`${pathPrefix}user`,RequireAuth, userRoutes)

    // Handle 404
    app.use('*', (req, res) => {
        res.status(404).json({
            message: "404 | Not Found"
        });
    });
}
