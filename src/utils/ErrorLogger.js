// Import dependencies
const winston = require("winston");
const winstonRotator = require('winston-daily-rotate-file');
const path = require("path");

const consoleConfig = [
    new winston.transports.Console({
        'colorize': true
    })
];

const createLogger = new winston.Logger({
    'transports': consoleConfig
});

if (process.env.NODE_ENV === 'production') {
    const successFile = path.join(__dirname, '..', 'log', 'success.log');
    const errorFile = path.join(__dirname, '..', 'log', 'error.log');
} else {
    const successFile = path.join(__dirname, '..', 'dev', 'log', 'success.log');
    const errorFile = path.join(__dirname, '..', 'dev', 'log', 'error.log');
}

const successLogger = createLogger;
successLogger.add(winstonRotator, {
    'name': 'access-file',
    'level': 'info',
    'filename': successFile,
    'json': true,
    'datePattern': 'yyyy-MM-dd-',
    'prepend': true
});

const errorLogger = createLogger;
errorLogger.add(winstonRotator, {
    'name': 'error-file',
    'level': 'error',
    'filename': path.join(__dirname, '..', 'log', 'error.log'),
    'json': true,
    'datePattern': 'yyyy-MM-dd-',
    'prepend': true
});

module.exports.successlog = successLogger;
module.exports.errorlog = errorLogger;
