// Import dependencies
const Listr = require('listr');
const startApp = require('./StartApp').StartApp;
const SetRoutes = require("./SetRoutes").SetRoutes;
const ConnectDB = require('./ConnectDB').ConnectDB;

/**
 * Runs all the tasks needed to start the application.
 * @return {Promise<void>}
 * @constructor
 */
exports.RunApp = async (app) => {

    const tasks = new Listr([
        {
            title: "Setting up routes...",
            task: () => SetRoutes(app)
        },
        {
            title: "Connecting to Database...",
            task: () => ConnectDB()
        },
        {
            title: "Starting application...",
            task: () => startApp(app)
        }
    ]);

    await tasks.run();
}
