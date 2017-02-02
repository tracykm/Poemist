var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

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
        test: /\.scss$|\.css$|\.sass$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.png$|\.jpg$/,
        loaders: ['url'],
      },
    ],
  },
  devtool: 'source-maps',
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.scss', '.css', '.js', '.json', '.jsx', '.png', '.jpg'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};

module.exports = webpackConfig;
