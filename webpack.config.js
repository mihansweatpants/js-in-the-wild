const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';
const highlightjs = './node_modules/highlight.js/styles/';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: 'vendor',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: 'vendor/bundles',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true
  }
];

const assets = [
  {
    from: 'src/img',
    to: 'img/'
  },
  'src/manifest.webmanifest',
  {
    from: resolve(`${highlightjs}/atom-one-dark.css`),
    to: 'theme',
  }
];

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
  }),
  new CopyWebpackPlugin([...polyfills, ...assets]),
  new ForkTsCheckerWebpackPlugin({
    async: false,
    tslint: resolve('tslint.json'),
    tsconfig: resolve('tsconfig.json'),
  }),
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      context: __dirname,
      entry: './src/index.ts',
      mode,
      output: {
        filename: '[name].[chunkhash:8].js'
      },
      resolve: {
        extensions: ['.mjs', '.ts', '.js', '.json'],
        alias: {
          '~': resolve(__dirname, 'src')
      }
      },
      devServer: {
        overlay: {
          errors: true,
          warnings: true,
        },
        proxy: {
          '/api': {
            target: 'http://localhost:5000/api',
            secure: false,
            changeOrigin: true,
          }
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-dynamic-import'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    useBuiltIns: 'usage',
                    targets: '>1%, not dead'
                  }
                ]
              ]
            }
          },
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            }
          }
        ]
      },
      plugins
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};
