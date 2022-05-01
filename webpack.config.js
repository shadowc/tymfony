const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const FileScanner = require('./src/framework/helpers/FileScanner');
const ConfigLoader = require('./src/framework/helpers/ConfigLoader');

fileScanner = new FileScanner();
configLoader = new ConfigLoader();

const mainConfig = {};
const mainConfigPath = path.resolve('.', 'config');

fileScanner.scanFiles(mainConfigPath, (file) => {
    const configData = configLoader.loadConfigFile(file);
    if (configData !== null) {
        Object.assign(mainConfig, configData);
    }
});

const mainControllerPath = path.resolve('.', 'src', mainConfig.framework.controller_path);
const entry = {
    'build/app': path.resolve('.', 'src', 'main'),
};

fileScanner.scanFiles(mainControllerPath, (file) => {
    if (file.substring(file.length - 3) === '.ts') {
        const fileName = `build/${file.substring(file.indexOf(mainConfig.framework.controller_path))}`;
        entry[fileName] = {
            import: path.resolve(mainControllerPath, file),
            library: {
                name: fileName,
                type: 'umd',
            },
        };
    }
});

module.exports = {
    target: "node",
    mode: process.env.APP_ENV,
    watchOptions: {
        ignored: '**/node_modules',
    },
    entry,
    output: {
        path: path.resolve('.'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(process.env.APP_ENV),
            APP_VERSION: JSON.stringify(JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString()).version),
        }),
    ],
    devtool: false,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@Framework': path.resolve(__dirname, 'src/framework'),
        },
    },
};
