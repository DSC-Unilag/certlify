const Logger = require('./logger').Logger
const getEnvs = require('./getEnv').getEnvs
const mongoose = require('mongoose')

/**
 * Starts the application database and connects to it
 */
exports.connectDB = async () => {

    Logger("Connecting To Database...")

    try {
		const conn = await mongoose.connect(getEnvs().DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})

		Logger(`MongoDB Connected: ${ conn.connection.host }`, 'green')
	} catch (err) {
		Logger("Unable To Connect To MongoDB", 'red')
		process.exit(1)
	}
}
