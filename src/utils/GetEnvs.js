// Import dependencies
const readFileSync = require('fs').readFileSync;
const path = require('path');
const dotenv = require('dotenv');

/**
 * Get data from .env file
 * @param {string} key The .env value to be fetched
 */
exports.GetEnvs = (key = '') => {
    const env_file = readFileSync(path.join(__dirname, '..', '..', '.env'));

    const env_vars = dotenv.parse(env_file);

    if (!key) return Object(env_vars);
    else {
        Object.keys(Object(env_vars)).forEach((element, i) => {
            if (key === element) return Object.values(Object(env_vars))[i];
        })
    }
}
