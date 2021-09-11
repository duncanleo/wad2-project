import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import * as webpack from 'webpack';

/**
 * Frontend configuration
 **/
const frontend: webpack.Configuration = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client', './src/frontend/index.ts'],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  },
                ],
                [
                  '@babel/preset-typescript',
                  {
                    allExtensions: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
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
