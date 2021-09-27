const express = require('express')
const urlencoded = require('body-parser').urlencoded
const Logger = require('./logger').Logger
const cors = require('cors')

const PORT = process.env.PORT || 3000
const app = express()

const authRoutes = require('../components/auth/auth.router')
const dashboardRoutes = require('../components/dashboard/dashboard.router')
const certificateRoutes = require('../components/certificates/certificates.router')
const appRoutes = require('../components/app/app.router')

/**
 * Initiate application
 */
exports.startApp = () => {
    
    // Set Greeting And Start App
	if (process.env.NODE_ENV === "production") {
		const greeting = "Application Started At PORT " + PORT + " in " + process.env.NODE_ENV + " Mode"

		// Start app
		app.listen(PORT, () => {
			Logger(greeting, 'green')
		})
	} else {
		const greeting = "Application Started At PORT " + PORT + "\nApplication can be found at http://localhost:" + PORT + "/api/v1/ in development mode."

		// Start app
		app.listen(PORT, () => {
			Logger(greeting, 'green')
		})
	}
}

/**
 * Set up routes and 404
 */
 exports.setRoutes = () => {

	app.use(express.json({ limit: '10mb' }))
	app.use(urlencoded({ extended: true }))
	app.use(cors())

	let pathPrefix = '/api/v1/'

	app.use(`${ pathPrefix }`, appRoutes)
	app.use(`${ pathPrefix }auth`, authRoutes)
	app.use(`${ pathPrefix }dashboard`, dashboardRoutes)
	app.use(`${ pathPrefix }certificates`, certificateRoutes)

	// Handle 404
	app.use('*', (req, res) => {
		res.status(404).json({
			message: "404 | Not Found"
		})
	})
}
