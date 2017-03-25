import * as path from 'path';

export default {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: './src/server.ts',
  target: 'node',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.ts?$/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html', '.hbs']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
