import express from 'express';
import morgan from 'morgan';
import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../../webpack.config';

const { PORT, NODE_ENV } = process.env;

const compiler = webpack(webpackConfig);

const app = express();

app.use(morgan('dev'));

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
    app.use(devMiddleware(compiler, {}));
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
