// Import dependencies
const logger = require('./Logger').Logger;
const mongoose = require('mongoose');
const getEnvs = require('./GetEnvs').GetEnvs;
const { FileLogger } = require('./ErrorLogger');

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
        FileLogger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        logger("Unable to connect to database", 'red');
        FileLogger.error(`Unable to connect to Mongo`, { error });
        process.exit(1);
    }
}
