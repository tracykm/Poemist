var path = require("path");
// var context = require.context('./src', true, /-test\.jsx?$/);
// context.keys().forEach(context);

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      }
    ],
  }
};
