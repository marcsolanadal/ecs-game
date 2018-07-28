const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const rules = require('./webpack.rules');

module.exports = {
  entry: [
    './src/game/game.js'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },
  stats: 'minimal',
  resolve: {
    extensions: ['.js'],
    alias: {
      utils: path.resolve(__dirname, '../src/utils'),
      engine: path.resolve(__dirname, '../src/engine')
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
