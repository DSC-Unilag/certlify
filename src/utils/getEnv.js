const dotenv = require('dotenv')
const readFileSync = require('fs').readFileSync
const path = require('path')

/**
 * Get data from .env file
 * @param {string} key The .env value to be fetched
 */
exports.getEnvs = (key = '') => {

    const env_file = readFileSync(path.join(__dirname, '..', '..', '.env'))

    const env_vars = dotenv.parse(env_file)

    // Return requested key
    if (key) {
		Object.keys(Object(env_vars)).forEach((element, i) => {
			if (key === element) {
				return Object.values(Object(env_vars))[i]
			}
		})
	} else {
		return Object(env_vars)
	}
}
