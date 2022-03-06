// // Import dependencies
// const winston = require("winston");//
// const consoleConfig = [
//     new winston.transports.Console({
//         'colorize': true
//     })
// ];
//
// const createLogger = new winston.createLogger({
//     'transports': consoleConfig
// });
//
//
// const successLogger = createLogger;
// successLogger.add(winstonRotator, {
//     'name': 'access-file',
//     'level': 'info',
//     'filename': successFile,
//     'json': true,
//     'datePattern': 'yyyy-MM-dd-',
//     'prepend': true
// });
//
// const errorLogger = createLogger;
// errorLogger.add(winstonRotator, {
//     'name': 'error-file',
//     'level': 'error',
//     'filename': errorFile,
//     'json': true,
//     'datePattern': 'yyyy-MM-dd-',
//     'prepend': true
// });
//
// module.exports.successlog = successLogger;
// module.exports.errorlog = errorLogger;

// Import dependencies
const winston = require("winston");
const path = require("path");
const winstonRotator = require('winston-daily-rotate-file');

let successFile, errorFile;

if (process.env.NODE_ENV === 'production') {
    successFile = path.join(__dirname, '..', 'log', 'success.log');
    errorFile = path.join(__dirname, '..', 'log', 'error.log');
} else {
    successFile = path.join(__dirname, '..', 'dev', 'log', 'success.log');
    errorFile = path.join(__dirname, '..', 'dev', 'log', 'error.log');
}

const logger = winston.createLogger({
    format: winston.format.json,
    transports: [
        new winstonRotator({
            filename: successFile,
            datePattern: 'yyyy-MM-dd-'
        }),
        new winston.transports.File({
            level: 'info',
            filename: successFile
        }),
        new winston.transports.File({
            level: 'error',
            filename: errorFile
        })
    ]
});

exports.fileLogger = logger;

// Todo: fix this file
