/* eslint-disable */
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const distPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        bundle: [
            path.resolve(srcPath, 'index.tsx')
        ],
    },
    context: __dirname,
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.js',
            '.tsx',
            '.ts',
        ],
    },
    output: {
        filename: 'bundle.js',
        path: distPath,
        publicPath: '/',
    },
    target: 'web',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: publicPath,
                    to: distPath,
                },
            ],
        }),
    ],
};
