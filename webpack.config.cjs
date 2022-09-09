const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const generalConfig = {
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
};

const nodeConfig = {
  entry: './src/FITSParser-node.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'node.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};

const browserConfig = {
  entry: './src/FITSParser-browser.ts',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'browser.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true,
    library: 'jsFITSio',
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    generalConfig.devtool = 'cheap-module-source-map';
  } else if (argv.mode === 'production') {
  } else {
    throw new Error('Specify env');
  }

  Object.assign(nodeConfig, generalConfig);
  Object.assign(browserConfig, generalConfig);

  return [nodeConfig, browserConfig];
};