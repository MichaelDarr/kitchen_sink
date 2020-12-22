/* eslint-disable */
const path = require('path');

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        overlay: {
            errors: true,
            warnings: false,
        },
        port: process.env['PORT'] || 8080,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
                exclude: [
                    /node_modules/,
                ]
            }
        ],
    },
});
