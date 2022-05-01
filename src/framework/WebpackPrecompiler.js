const path = require('path');
const fs = require('fs');
const FileScanner = require('./helpers/FileScanner');
const ConfigLoader = require('./helpers/ConfigLoader');

/**
 * A class to write automatically generate bundles with all our
 * components, services, entities, models, etc... included in our project
 * to be automatically included by Webpack
 */
class WebpackPrecompiler {
    /**
     * @type {object}
     */
    config = {};

    /**
     * @type {string}
     */
    mainConfigPath = '';

    /**
     * @type {FileScanner}
     */
    fileScanner = null;

    /**
     * @param {string} mainConfigPath
     */
    constructor(mainConfigPath) {
        this.mainConfigPath = mainConfigPath;
        this.fileScanner = new FileScanner();

        this.readProjectConfig();
    }

    /**
     * Reads the project configuration files and stores them in
     * the config object.
     */
    readProjectConfig() {
        const configLoader = new ConfigLoader();

        this.config = {}

        this.fileScanner.scanFiles(this.mainConfigPath, (file) => {
            const configData = configLoader.loadConfigFile(file);
            if (configData !== null) {
                Object.assign(this.config, configData);
            }
        });
    }

    /**
     * This function scans controller files and will create a file
     * that imports and re-exports these to be handler as an intake
     * point by the Framework main class.
     *
     * @param {string} outputFile
     */
    createControllerBundle(outputFile) {
        const mainControllerPath = path.resolve('.', 'src', this.config.framework.controller_path);
        let outText = '';

        this.fileScanner.scanFiles(mainControllerPath, (file) => {
            const trimmedFile = file.substring(file.indexOf(this.config.framework.controller_path));
            outText += `export * from '@src/${trimmedFile.substring(0, trimmedFile.length - 3)}';\n`;
        });

        fs.writeFileSync(outputFile, outText);
    }
}

module.exports = WebpackPrecompiler;
