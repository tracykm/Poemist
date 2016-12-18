var HtmlWebpackPlugin = require('html-webpack-plugin');
// var resolve = require('path').resolve;

var webpackConfig = {
  entry: './src/entry.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
    ],
  },
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};

module.exports = webpackConfig;
