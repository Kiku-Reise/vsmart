const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './test/assets/js/'),
  entry: './bundle',
  output: {
    path: path.resolve(__dirname, './test/assets/js/'),
    filename: 'bundle.js',
    publicPath: "/js/",
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    
  ],
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }, ]
  },
  watch: true
};