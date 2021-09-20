const chalk = require('chalk')

exports.Logger = (text, color = 'yellow') => {
    const obj = {
        yellow: chalk.yellow.bold,
        red: chalk.red.bold,
		green: chalk.green.bold
    }

    console.log(Object(obj)[color](text))
}
