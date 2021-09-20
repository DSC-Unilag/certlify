const chalk = require('chalk')

/**
 * Display colorful, helpful messages to the console
 * @param {string} text Text to be logged
 * @param {string} color Color of text
 */
exports.Logger = (text, color = 'yellow') => {
    const obj = {
        yellow: chalk.yellow.bold,
        red: chalk.red.bold,
		green: chalk.green.bold
    }

    console.log(Object(obj)[color](text))
}
