// import path from 'path';
// import { ProgressPlugin } from 'webpack'; //to access built-in plugins
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        fitsparser: './src/FITSParser.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        // path: path.resolve(__dirname, 'dist'),
        // library: 'fitsparser.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-private-methods", "@babel/plugin-proposal-class-properties"]
                    }
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        usedExports: true,
    },
    plugins: [
        // new webpack.ProgressPlugin(),
        // new CleanWebpackPlugin(),
    ],
};