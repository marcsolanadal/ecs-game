const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const rules = require('./webpack.rules');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      utils: path.resolve(__dirname, '../src/utils'),
      ducks: path.resolve(__dirname, '../src/ducks')
    },
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules
  }
};
