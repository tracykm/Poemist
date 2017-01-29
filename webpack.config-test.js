var nodeExternals = require('webpack-node-externals');
var config = require('./webpack.config.js')

config.target = 'node';
config.externals = [nodeExternals()];

module.exports = config;
