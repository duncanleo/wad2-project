import express from 'express';
import morgan from 'morgan';
import path from 'path';

const { PORT, NODE_ENV } = process.env;

const app = express();

app.use(morgan('dev'));

/* eslint-disable @typescript-eslint/no-var-requires */

switch (NODE_ENV) {
  case 'production': {
    let assetsPath = path.join(__dirname, '../..', 'dist', 'public');

    if (NODE_ENV === 'production') {
      assetsPath = path.join(__dirname, 'public');
    }

    app.get('/', function (req, res) {
      res.sendFile(path.join(assetsPath, 'index.html'));
    });

    app.use('/public', express.static(assetsPath));
    break;
  }
  default: {
    const webpack = require('webpack');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');

    const webpackConfig = require('../../webpack.config');

    const compiler = webpack(webpackConfig);
    app.use(devMiddleware(compiler, {}));

    app.use(hotMiddleware(compiler));
    break;
  }
}

let port = 5000;

if (PORT != null) {
  try {
    port = parseInt(PORT, 10);
  } catch (e) {}
}

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
