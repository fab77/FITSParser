import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PATHS = {
  entryPoint4Browser: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, '_bundles'),
}


var browserConfig = {
  entry: {
    'jsfitsio': [PATHS.entryPoint4Browser],
    'jsfitsio.min': [PATHS.entryPoint4Browser]
  },
  target: 'web',
  externals: {},
  output: {
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
    }
  },
  devtool: 'source-map',
  plugins: [
  ],
  module: {  
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        exclude: ["/node_modules/", "/src/FSWriter.ts"],
        
      },
    ],
  }
}



export default (env, argv) => {
  return [browserConfig];
};


