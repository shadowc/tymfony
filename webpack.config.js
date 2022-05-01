const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const WebpackPrecompiler = require('./src/framework/WebpackPrecompiler');

const mainConfigPath = path.resolve('.', 'config');
const precompiler = new WebpackPrecompiler(mainConfigPath);

// This writes the controllers_bundle.ts file to be included by the framework
precompiler.createControllerBundle(path.resolve('.', 'src', 'controllers_bundle.ts'));

// TODO: Auto import services and other files under src. Auto-wiring also could happen here.

module.exports = {
    target: "node",
    mode: process.env.APP_ENV,
    watchOptions: {
        ignored: '**/node_modules',
    },
    entry: {
        'build/app': path.resolve('.', 'src', 'main'),
    },
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
            '@src': path.resolve(__dirname, 'src'),
            '@Framework': path.resolve(__dirname, 'src', 'framework'),
        },
    },
};
