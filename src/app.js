const express = require('express')
const morgan = require('morgan')
const path = require('path')
const createStream = require('rotating-file-stream').createStream
const createWriteStream = require('fs').createWriteStream
const Logger = require('./utils/logger').Logger
const runApp = require('./utils/run_app').runApp

const app = express()

// Logging in production
const accessDailyLogStream = createStream('access.log', {
	interval: '1d',
	path: path.join(__dirname, 'log')
});

// Logging in development
var accessDevLogStream = createWriteStream(path.join(__dirname, 'log', 'dev', 'access.log'), { flags: 'a' })

Logger('Starting Logger.....')

if (process.env.NODE_ENV === 'production') {
	app.use(morgan('combined', { stream: accessDailyLogStream }))

	Logger("Now Writing Logs To log/access.log", 'green')
} else {
	app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: accessDevLogStream }))

	Logger("Now Writing Logs To log/dev/access.log", 'green')
}

runApp()
