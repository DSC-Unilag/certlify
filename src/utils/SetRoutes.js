// Import dependencies
const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const cors = require('cors');

const app = express();
const appRoutes = require('../routes/app');

exports.SetRoutes = () => {
    app.use(express.json({
        limit: '10mb'
    }));

    app.use(urlencoded({
        extended: true
    }));

    app.use(cors());

    let pathPrefix = '/api/v2';

    app.use(`${pathPrefix}`, appRoutes);

    // Handle 404
    app.use('*', (req, res) => {
        res.status(404).json({
            message: "404 | Not Found"
        });
    });
}
