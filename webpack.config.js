'use strict'

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devMode = process.env.NODE_ENV === 'development'
const filenameSchema = '[name].[contenthash]'

const config = {
  mode: devMode ? 'development' : 'production',
  stats: {
    colors: true
  },
  devtool: 'source-map',
  performance: {
    hints: devMode ? false : 'warning',
    maxEntrypointSize: 400000,
    maxAssetSize: 400000
  },

  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: devMode ? '[name].js' : `${filenameSchema}.js`,
    chunkFilename: '[contenthash].js'
  },
  devServer: {
    port: 18283,
    open: true
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /^(.(?!\.min\.js$))+\.m?js$/,
        exclude: process.env.BABEL_LOADER_EXCLUDE ||
          /node_modules(?!\/@ecomplus\/[^/]+\/(?!dist))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: '3.6',
                modules: false
              }]
            ]
          }
        }
      }
    ]
  }
}

module.exports = config
