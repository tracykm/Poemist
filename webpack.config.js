var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

var webpackConfig = {
  entry: './src/entry.jsx',
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
  devServer: {
    historyApiFallback: true,
  },
  node: {
    fs: 'empty',
  },
}

module.exports = webpackConfig
