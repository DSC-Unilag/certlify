// Import dependencies
const logger = require('./Logger').Logger;
const FileLogger = require('./ErrorLogger').FileLogger;

// const app = require('./SetRoutes').app;
const PORT = process.env.PORT || 1234;

/**
 * Initiates the application, after other tasks have been run.
 */
exports.StartApp = (app) => {
    if (process.env.NODE_ENV === 'production') {
        const greeting = `Application Started At PORT ${PORT} in ${process.env.NODE_ENV} Mode.`;

        app.listen(PORT, () => {
            logger(greeting, 'green');
            FileLogger.info(greeting);
        })
    } else {
        const greeting = `Application Started At PORT ${PORT}.\nApplication can be found at http://localhost:${PORT}/api/v2/ in development mode.`

        app.listen(PORT, () => {
            logger(greeting, 'green');
            FileLogger.info(greeting);
        })
    }
}
