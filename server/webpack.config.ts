/* tslint:disable:object-literal-sort-keys */

import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import { DefinePlugin } from 'webpack';

export default {
  cache:   true,
  devtool: 'inline-source-map',
  entry:   './src/server.ts',
  output:  {
    path:     path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },

  // Without these settings Webpack brakes our Node.js app.
  target: 'node',
  node:   {
    fs:         'empty',
    net:        'empty',
    tls:        'empty',
    __dirname:  false,
    __filename: false
  },

  module: {
    rules: [
      {
        loader: 'awesome-typescript-loader',
        test:   /\.ts?$/
      },
      {
        test:    /\.(png|jpg|gif|svg)$/,
        loader:  'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        enforce: 'pre',
        test:    /\.js$/,
        loader:  'source-map-loader'
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/templates',
        to:   'templates'
      }, {
        from: 'public',
        to:   'public'
      }
    ])
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.hbs'],

    // Need this alias, otherwise webpack warning about handlebar
    alias:   {
      handlebars: 'handlebars/dist/handlebars.js'
    },
    plugins: [
      new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
    ]
  }
};
