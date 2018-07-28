/* eslint-disable no-console */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const app = express();
const config = require('./webpack/webpack.dev.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
		colors: true
	}
}));

app.use(webpackHotMiddleware(compiler));

// Allows serving static assets
// app.use(express.static('assets'));
app.use('/assets', express.static(path.join(__dirname, 'src/game/assets')))

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('listening on port 3000...\n');
});
