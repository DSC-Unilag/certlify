// Import dependencies
const winston = require('winston');
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');
const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry) => {
    const base = { timestamp: new Date() };
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);
    return logEntry;
}

exports.FileLogger = winston.createLogger({
    level: 'info',
    format: winston.format(jsonFormatter)(),
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'log', 'error.log'),
            level: 'error'
        }),
        new DailyRotateFile({
            filename: path.join(__dirname, '..', 'log', 'status-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
        }),
        new DailyRotateFile({
            filename: path.join(__dirname, '..', 'log', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'log', 'status.log'),
        }),
    ],
});
