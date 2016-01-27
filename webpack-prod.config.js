var path = require('path');

module.exports = {
  entry: [
    './client/src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'client'),
    publicPath: '/client/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
