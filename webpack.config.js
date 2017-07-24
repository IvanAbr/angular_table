var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    tether: 'tether',
    Tether: 'tether',
    'window.Tether': 'tether',
})],
module:{
loaders: [
  	{
  		test: /\.css$/,
  		loader: 'style-loader!css-loader'﻿
  	}
  ]
  }
};






// module.exports = {
//   entry: './js/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// };
