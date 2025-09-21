import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin';
import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
const pkg = require('./package.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  entryPoint4Browser: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, 'dist'),
}

const ENTRY = path.resolve(__dirname, 'src/index.ts');
const OUT = path.resolve(__dirname, 'dist');

const common = {
  // ...
  // resolve: { extensions: ['.ts', '.tsx', '.js'] },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.ts', '.js'],   // import './x.js' -> prefer './x.ts' at build time
      '.mjs': ['.mts', '.mjs']
    }
  },  
  module: { rules: [{ test: /\.(ts|tsx)$/i, use: 'ts-loader', exclude: /node_modules/ }] },
  optimization: { splitChunks: false, runtimeChunk: false },
  devtool: 'source-map',
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^node:/, r => { r.request = r.request.replace(/^node:/, ''); }),
    new webpack.DefinePlugin({ __APP_VERSION__: JSON.stringify(pkg.version) }),
  ],
};

// UMD build (normal + min)
const umdConfig = {
  ...common,
  target: 'web',
  entry: {
    jsfitsio: ENTRY,           // <-- plain string
    'jsfitsio.min': ENTRY,     // <-- plain string
  },
  output: {
    path: OUT,
    filename: '[name].js',
    library: 'jsfitsio',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  // Optional: only minify the *.min.js file
  // Requires: npm i -D terser-webpack-plugin
  // optimization: {
  //   ...common.optimization,
  //   minimize: true,
  //   minimizer: [new TerserPlugin({ include: /\.min\.js$/ })],
  // },
};

// CJS build
const cjsConfig = {
  ...common,
  target: 'node',
  entry: ENTRY,                  // <-- plain string
  output: {
    path: OUT,
    filename: 'jsfitsio.cjs',
    libraryTarget: 'commonjs2',
  },
  optimization: { splitChunks: false, runtimeChunk: false, minimize: false }
};

export default [umdConfig, cjsConfig];


// var browserConfig = {
//   entry: {
//     'jsfitsio': [PATHS.entryPoint4Browser],
//     'jsfitsio.min': [PATHS.entryPoint4Browser]
//   },
//   target: 'web',
//   externals: {},
//   output: {
//     chunkFilename: '[name].bundle.js?h=[chunkhash]',
//     path: PATHS.bundles,
//     libraryTarget: 'umd',
//     library: 'jsfitsio',
//     umdNamedDefine: true
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//     extensionAlias: {
//       '.js': ['.ts', '.js'],
//       '.mjs': ['.mts', '.mjs']
//     },
//     fallback: {
//     }
//   },
//   devtool: 'source-map',
//   plugins: [
//     new webpack.NormalModuleReplacementPlugin(
//       /^node:/,
//       (resource) => {
//         resource.request = resource.request.replace(/^node:/, '');
//       },
//     ),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/i,
//         use: 'ts-loader',
//         exclude: ["/node_modules/", "/src/getLocalFile.ts"],
//       },
//     ],
//   }
// }



// export default (env, argv) => {
//   return [browserConfig];
// };


