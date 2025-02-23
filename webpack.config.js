import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createRequire } from "node:module"
const require = createRequire(import.meta.url)

const PATHS = {
  // entryPoint4Browser: path.resolve(__dirname, 'src/index-wp.ts'),
  entryPoint4Browser: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, 'dist'),
}


var browserConfig = {
  entry: {
    'jsfitsio': [PATHS.entryPoint4Browser],
    'jsfitsio.min': [PATHS.entryPoint4Browser]
  },
  target: 'web',
  externals: {},
  output: {
    chunkFilename: '[name].bundle.js?h=[chunkhash]',
    path: PATHS.bundles,
    libraryTarget: 'umd',
    library: 'jsfitsio',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs']
    },
    fallback: {
      // "fs": require.resolve("fs"),
      // "url": require.resolve("url"),
      // "path": require.resolve("path")
      // "path": require.resolve("path-browserify")
      // "fs": false,
      // "url": false,
      // "path": false,
      // "node:fs/promises": false
    }
  },
  devtool: 'source-map',
  plugins: [
    // new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
    //   const mod = resource.request.replace(/^node:/, "");

    //   switch (mod) {
    //     case "fs":
    //       console.log("@@@ FS FS FS FS FS FS")
    //       // resource.request = "fs";
    //       break;
    //     case "fs/prmise":
    //       console.log("@@@ FS/PROMISE FS FS FS FS FS")
    //       // resource.request = "path-browserify";
    //       break;
    //     default:
    //       throw new Error(`Not found ${mod}`);
    //   }
    // }),
    new webpack.NormalModuleReplacementPlugin(
      /^node:/,
      (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      },
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        // exclude: ["/node_modules/", "/src/FSWriter.ts"],
        exclude: ["/node_modules/", "/src/getLocalFile.ts"],
      },
    ],
  }
}



export default (env, argv) => {
  return [browserConfig];
};


