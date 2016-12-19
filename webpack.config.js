var HtmlWebpackPlugin = require('html-webpack-plugin');
// var resolve = require('path').resolve;

var webpackConfig = {
  entry: './src/entry.js',
  output: {
    path: 'app/assets/javascripts',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
    ],
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  devtool: 'eval',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'src/index.html',
  //   }),
  // ],
};

module.exports = webpackConfig;
