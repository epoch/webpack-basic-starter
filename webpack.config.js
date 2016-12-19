// entry.app corresponds to output.filename [name]

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const sourceMap = false;

module.exports = {
  devtool: isProd && sourceMap ? 'inline-source-map' : false,
  context: path.join(__dirname, 'src'),
  entry: {
    app: './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: { 
            presets: [['es2015', { modules: false }], 'react'],
            compact: false // not include superfluous whitespace characters and line terminators
          }
        }]
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
