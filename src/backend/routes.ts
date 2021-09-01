import { Application } from 'express';

import { healthz } from './api/healthz';

const routes = (app: Application) => {
  app.get('/healthz', healthz);
};

export default routes;
