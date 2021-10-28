import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);
// import webpack from 'webpack'; //to access built-in plugins

export default {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        fitsparser: './src/FITSParser.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
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
    resolve: {
        fallback: {
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "stream": false,
          "crypto": false,
          "url": false,
          "util": false,
          "buffer": false
        } 
      },
}
