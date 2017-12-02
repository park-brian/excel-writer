const path = require('path');

const config = {
  entry: './src/main.ts',
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/, 
        exclude: /node_modules|docs/,
        use: 'ts-loader',
      },
      {
        test: /\.xml$|\.rels$/, 
        exclude: /node_modules|docs/,
        use: 'raw-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.xml', '.rels'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
  }
};

module.exports = config;