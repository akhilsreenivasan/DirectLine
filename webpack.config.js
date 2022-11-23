const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 output: {
   path: path.join(__dirname, '/build'),
   filename: 'index.bundle.js',
   publicPath: '/'
 },
 devServer: {
   port: 3000,
   historyApiFallback: true,
   static: path.join(__dirname, 'dist'),
 },
 devtool: 'source-map',
 plugins: [
   
 ],
 module: {
   rules: [
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
      type: 'asset/inline',
    },
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
      test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader" 
        }, {
          loader: "sass-loader"
        }]
  },
     {
       test: /\.css$/,
       use: ['style-loader', {
        loader: "css-loader", //generating unique classname
        options: {
          importLoaders: 1, // if specifying more loaders
          modules: true
        }
      }]
     }
   ]
 },
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}