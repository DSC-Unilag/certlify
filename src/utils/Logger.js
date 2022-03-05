const chalk = require('chalk');

/**
 * Display colorful, helpful messages to the console
 * @param text Text to be logged
 * @param color Color of the text. Can be "yellow", "red", or "green".
 */
exports.Logger = (text, color = 'yellow') => {
    const obj = {
        yellow: chalk.yellow,
        red: chalk.red,
        green: chalk.green
    }

    console.log(Object(obj)[color](text))
}
