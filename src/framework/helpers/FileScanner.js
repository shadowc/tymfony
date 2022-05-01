const fs = require('fs');
const path = require('path');

/**
 * FileScanner
 *
 * Recursively scan files under a directory path and calls a callback function
 * for each entry to process the file.
 */
class FileScanner {
    /**
     * @param {string} absolutePath - The absolute path to scan files from
     * @param {function(filePath: string)} callback - The callback function to process each entry
     */
    scanFiles(absolutePath, callback) {
        const files = fs.readdirSync(absolutePath);

        files.forEach((file) => {
            const filePath = path.resolve(absolutePath, file);

            if (!fs.lstatSync(filePath).isDirectory()) {
                callback(filePath);
            } else {
                this.scanFiles(filePath, callback);
            }
        });
    }
}

module.exports = FileScanner;
