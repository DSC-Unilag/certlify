const Listr = require('listr')
const connectDB = require('./connectDb').connectDB
const startApp = require('./app').startApp
const setRoutes = require('./app').setRoutes

/**
 * Runs all the tasks to start application
 */
exports.runApp = async () => {

    // Set Tasks
    const tasks = new Listr([
        {
            title: 'Setting Up Routes...',
            task: () => setRoutes(),
        },
        {
            title: 'Connecting To Database...',
            task: () => connectDB(),
        },
        {
            title: 'Starting Application...',
            task: () => startApp(),
        },
    ])

    await tasks.run()
};
