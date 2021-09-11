import cookieSession from 'cookie-session';
import express, { Application, NextFunction, Request, Response } from 'express';

import { healthz } from './api/healthz';
import { login } from './api/login';
import { signup } from './api/signup';
import { ErrorRequest } from './errors';
import asyncWrapper from './util/asyncWrapper';

const { COOKIE_KEY } = process.env;

if (COOKIE_KEY == null) {
  throw new Error('COOKIE_KEY not provided');
}

const routes = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      name: 'session',
      keys: [COOKIE_KEY],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );

  app.get('/healthz', asyncWrapper(healthz));
  app.post('/login', asyncWrapper(login));
  app.post('/signup', asyncWrapper(signup));

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 400;

    if (err instanceof ErrorRequest) {
      statusCode = err.statusCode;
    }

    res.status(statusCode);
    res.json({
      status: false,
      error: err.message,
    });
    res.end();
  });
};

export default routes;
