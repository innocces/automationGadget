const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline:true,
    contentBase: path.resolve(__dirname,'dist'),
    compress: true,
    port: 9000
  },
  mode: 'production',  // 开启生产环境
  entry : './src/index.js',
  output : {
    path : path.resolve(__dirname,'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      { test: /\.js$/,exclude: /(node_modules|bower_components)/,use: {loader: 'babel-loader',options: {presets: ['@babel/preset-env']}} },
      { test: /\.(htm|html)$/,use: [ 'raw-loader' ] },   // 在入口文件中增加index.html
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname,'src/index.html'), to: path.resolve(__dirname,'dist/index.html') },
      { from: path.resolve(__dirname, 'public/*'),to: path.resolve(__dirname,'dist')}
    ])
  ]
}