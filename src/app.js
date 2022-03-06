// Import dependencies
const express = require('express');
const runApp = require('./utils/RunApp').RunApp;
const morgan = require('morgan');
const path = require('path');
const createStream = require('rotating-file-stream').createStream
const createWriteStream = require('fs').createWriteStream
const logger = require('./utils/Logger').Logger;

// Initialize application
const app = express();

// For logging in production
const accessDailyLogStream = createStream('app.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
});

// For logging in dev
const accessDevLogStream = createWriteStream(path.join(__dirname, 'log', 'dev', 'app.log'), { flags: 'a' });

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined', {
        stream: accessDailyLogStream
    }));

    logger('Now Writing Logs To log/app.log', "green");
} else {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: accessDevLogStream
    }))

    logger('Now Writing Logs To log/dev/app.log', "green");
}

logger('Starting Logger.....');

runApp(app);
