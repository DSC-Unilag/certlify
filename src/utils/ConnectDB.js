// Import dependencies
const logger = require('./Logger').Logger;
const mongoose = require('mongoose');
const getEnvs = require('./GetEnvs').GetEnvs;

/**
 * Starts the application database and connects to it
 */
exports.ConnectDB = async () => {
    logger("Connecting to database...");

    try {
        const conn = await mongoose.connect(getEnvs().DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        logger(`MongoDB connected: ${conn.connection.host}`, 'green');
    } catch (error) {
        console.log(error)
        logger("Unable to connect to database", 'red');
        process.exit(1);
    }
}
