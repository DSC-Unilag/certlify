// Import dependencies
const Listr = require('listr');
const {ConnectDB} = require("./ConnectDB");
const startApp = require('./StartApp').StartApp;
const SetRoutes = require("./SetRoutes").SetRoutes;
const connectDB = require('./ConnectDB').ConnectDB;

/**
 * Runs all the tasks needed to start the application.
 * @return {Promise<void>}
 * @constructor
 */
exports.RunApp = async () => {

    const tasks = new Listr([
        {
            title: "Setting up routes...",
            task: () => SetRoutes()
        },
        {
            title: "Connecting to Database...",
            task: () => ConnectDB()
        },
        {
            title: "Starting application...",
            task: () => startApp()
        }
    ]);

    await tasks.run();
}
