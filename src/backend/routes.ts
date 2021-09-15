import { Application, NextFunction, Request, Response } from 'express';

import { healthz } from './api/healthz';
import { login } from './api/login';
import { signup } from './api/signup';
import { ErrorRequest } from './errors';
import asyncWrapper from './util/asyncWrapper';

const routes = (app: Application) => {
  app.get('/healthz', asyncWrapper(healthz));
  app.post('/login', asyncWrapper(login));
  app.post('/signup', asyncWrapper(signup));

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 400;
    let message = 'An error occurred';

    if (err instanceof ErrorRequest) {
      statusCode = err.statusCode;
      message = err.message;
    }

    console.error(err);

    res.status(statusCode);
    res.json({
      status: false,
      message,
    });
    res.end();
  });
};

export default routes;
