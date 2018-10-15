// https://scotch.io/tutorials/setting-up-webpack-for-any-project

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

require('dotenv').config();

const ENV = process.env.NODE_ENV;
const isTest = ENV === 'testing';
const isProd = ENV === 'production';

function setDevTool() {
  if (isTest) return 'inline-source-map';
  if (isProd) return 'source-map';
  return 'eval-source-map';
}

const config = {
  entry: path.join(__dirname, '/src/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /app.js|node_modules|src\/server/,
        use: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(path.join(__dirname, '/dist/main.css')),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/client/public/index.html'),
      inject: 'body',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/src/client/public'),
    historyApiFallback: true,
    port: process.env.CLIENT_PORT || 5000,
  },
  devtool: setDevTool(),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

if (isProd) {
  config.plugins = [
    ...config.plugins,
    new UglifyJSPlugin(),
  ];
}

module.exports = config;
