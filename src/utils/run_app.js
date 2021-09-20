const Listr = require('listr')
const connectDB = require('./connectDb').connectDB
const startApp = require('./app').startApp

/**
 * Runs all the tasks to start application
 */
exports.runApp = async () => {

    // Set Tasks
    const tasks = new Listr([
        {
            title: 'Starting Application.....',
            task: () => {
                return true
            }
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
