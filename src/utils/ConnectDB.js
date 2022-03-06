// Import dependencies
const logger = require('./Logger').Logger;
const mongoose = require('mongoose');
const getEnvs = require('./GetEnvs').GetEnvs;
const { fileLogger } = require('./ErrorLogger');

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
        // fileLogger.info(`MongoDB connected: ${conn.connection.host}`); // Todo: fix this
    } catch (error) {
        logger("Unable to connect to database", 'red');
        // fileLogger.error(`Unable to connect to database: ${error}`) // Todo: fix this
        process.exit(1);
    }
}
