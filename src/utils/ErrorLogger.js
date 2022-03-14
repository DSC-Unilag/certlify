// Import dependencies
const winston = require('winston');
const path = require('path');

exports.FileLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'log', 'error.log'),
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'log', 'status.log'),
        }),
    ],
});
