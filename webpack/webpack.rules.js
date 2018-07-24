module.exports =  [
  { 
    test: /\.js$/, 
    exclude: /node_modules/, 
    loader: 'babel-loader'
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ['file-loader']
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['file-loader']
  }
];
