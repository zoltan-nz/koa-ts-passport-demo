import * as path from 'path';

export default {
  entry: './src/index.ts',
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
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
