var path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    entry: {
        app: './src/index.js',

    },
    entry: './src/FITSParser.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'ftisparser',
    },
    optimization: {
        runtimeChunk: true,
        usedExports: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    externals: {
        jquery: "jQuery"
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
                        "plugins": ["@babel/plugin-proposal-private-methods", "@babel/plugin-proposal-class-properties"]
                    }
                }
            }
        ]
    },

};