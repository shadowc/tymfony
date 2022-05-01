const webpack = require('webpack');
const path = require("path");
const fs = require("fs");

module.exports = {
    target: "node",
    mode: process.env.APP_ENV,
    watchOptions: {
        ignored: '**/node_modules',
    },
    entry: {
        'build/app': path.resolve('./src/framework/main'),
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
    devtool: process.env.APP_ENV === 'production' ? false : 'eval-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@Framework': path.resolve(__dirname, 'src/framework'),
        },
    },
};
