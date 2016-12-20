// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var resolve = require('path').resolve;

var webpackConfig = {
  entry: './src/entry.js',
  output: {
    path: 'app/assets/javascripts',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, loaders: ['babel'], exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  devtool: 'eval',
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json', '.jsx'],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'src/index.html',
  //   }),
  // ],
};

module.exports = webpackConfig;
