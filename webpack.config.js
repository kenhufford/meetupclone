const path = require('path');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './frontend/meetup.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  //   }),
  // ]
};


