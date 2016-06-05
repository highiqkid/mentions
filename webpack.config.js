var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool:'source-map',
  entry: {
      app: path.join(__dirname, 'public', 'scripts')
  },
  output: {
    path: path.join(__dirname, 'public', 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
	  {
		test: /plugin\.css$/,
        loaders: [
          'style', 'css',
        ],
	  }
    ],
  },
};
