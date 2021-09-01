import NodemonPlugin from 'nodemon-webpack-plugin';
import path from 'path';
import * as webpack from 'webpack';

/**
 * Backend configuration
 **/
const backend: webpack.Configuration = {
  mode: 'development',
  entry: ['./src/backend/main.ts'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new NodemonPlugin({
      script: './dist/main.js',
      watch: [path.resolve('./dist/main.js')],
      exec: 'node',
    }),
  ],
  target: 'node',
};

/**
 * Frontend configuration
 **/
const frontend: webpack.Configuration = {
  mode: 'development',
  entry: ['./src/frontend/index.ts'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist', 'frontend'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'web',
};

export default [backend, frontend];
