import { Application, NextFunction, Request, Response } from 'express';

import auth from './api/auth';
import { gamesList } from './api/game';
import { gameAccountLink } from './api/gameaccount';
import { healthz } from './api/healthz';
import { login } from './api/login';
import me from './api/me';
import { signup } from './api/signup';
import { teamCreate, teamDelete, teamsList, teamUpdate } from './api/team';
import {
  tournamentCreate,
  tournamentDelete,
  tournamentsList,
  tournamentUpdate,
} from './api/tournament';
import { ErrorRequest } from './errors';
import asyncWrapper from './util/asyncWrapper';

const routes = (app: Application) => {
  app.get('/healthz', asyncWrapper(healthz));
  app.post('/login', asyncWrapper(login));
  app.post('/signup', asyncWrapper(signup));
  app.get('/auth', asyncWrapper(auth));

  app.get('/api/me', asyncWrapper(me));

  app.get('/api/teams', asyncWrapper(teamsList));
  app.post('/api/teams', asyncWrapper(teamCreate));
  app.patch('/api/teams/:id', asyncWrapper(teamUpdate));
  app.delete('/api/teams/:id', asyncWrapper(teamDelete));

  app.get('/api/games', asyncWrapper(gamesList));
  app.post('/api/games/:id/account', asyncWrapper(gameAccountLink));

  app.get('/api/tournaments', asyncWrapper(tournamentsList));
  app.post('/api/tournaments', asyncWrapper(tournamentCreate));
  app.patch('/api/tournaments/:id', asyncWrapper(tournamentUpdate));
  app.delete('/api/tournaments/:id', asyncWrapper(tournamentDelete));

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
