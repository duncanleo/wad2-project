import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import * as webpack from 'webpack';

/**
 * Frontend configuration
 **/
const frontend: webpack.Configuration = {
  mode: 'development',
  entry: ['./src/frontend/index.ts'],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'public'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //@ts-ignore
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/frontend/index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
  },
  target: 'web',
};

export default frontend;
