import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import routes from './routes';

dotenv.config();

const { PORT, NODE_ENV, COOKIE_KEY } = process.env;

if (COOKIE_KEY == null) {
  throw new Error('COOKIE_KEY not provided');
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(morgan('dev'));

/* eslint-disable @typescript-eslint/no-var-requires */

switch (NODE_ENV) {
  case 'production': {
    const assetsPath = path.join(__dirname, 'public');

    app.get('/', function (req, res) {
      res.sendFile(path.join(assetsPath, 'index.html'));
    });

    app.use(express.static(assetsPath));
    break;
  }
  default: {
    const webpack = require('webpack');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');

    const webpackConfig = require('../../webpack.config').default;

    const compiler = webpack(webpackConfig);
    app.use(devMiddleware(compiler, {}));

    app.use(hotMiddleware(compiler));
    break;
  }
}

routes(app);

let port = 5000;

if (PORT != null) {
  try {
    port = parseInt(PORT, 10);
  } catch (e) {}
}

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
