const fs = require('fs');
const yaml = require('yaml');

/**
 * Loads a config file both in Framework and in Webpack
 */
class ConfigLoader {
    /**
     * @param {string} absolutePath - The yaml config file to load
     * @returns {any}
     */
    loadConfigFile(absolutePath) {
        if (absolutePath.substring(absolutePath.length - 5) === '.yaml'
            || absolutePath.substring(absolutePath.length - 4) === '.yml') {
            let contents = fs.readFileSync(absolutePath).toString();
            return yaml.parse(contents);
        }

        return null;
    }
}

module.exports = ConfigLoader;
