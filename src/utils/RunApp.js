// Import dependencies
const Listr = require('listr');
const startApp = require('./StartApp').StartApp;
const SetRoutes = require("./SetRoutes").SetRoutes;

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
            title: "Starting application...",
            task: () => startApp()
        }
    ]);

    await tasks.run();
}
