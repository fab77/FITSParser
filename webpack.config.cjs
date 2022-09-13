// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV == "production";
console.log("### isProduction: "+isProduction);
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: '[name].js',
    filename: '[name].js',
    libraryTarget: "var",
    library: "FITSioAPI",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    new MiniCssExtractPlugin(),

  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
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
    },
  },
  devtool:'source-map',
};



module.exports = (env, argv) => {
  if (argv.mode === 'development') {
      config.mode = "production";
  } else if (argv.mode === 'production') {
    config.mode = "development";
  } else {
    throw new Error('Specify env');
  }
  return config;
};
