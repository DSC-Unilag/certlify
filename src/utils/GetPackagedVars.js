/**
 * Get data from package.json file
 * @param key The value's key as it is in the package.json file
 */
exports.GetPackagedVars = (key = '') => {
    const env_file = require('../../package.json');
    return Object(env_file);
}
