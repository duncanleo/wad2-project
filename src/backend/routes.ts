import { Application, NextFunction, Request, Response } from 'express';

import auth from './api/auth';
import { gamesList } from './api/game';
import { gameAccountDelete, gameAccountLink } from './api/gameaccount';
import { healthz } from './api/healthz';
import { login } from './api/login';
import { logout } from './api/logout';
import me, { meUpdate } from './api/me';
import { playerGet, playersList } from './api/players';
import { search } from './api/search';
import { signup } from './api/signup';
import {
  teamCreate,
  teamDelete,
  teamInviteUser,
  teamRequestJoin,
  teamSingle,
  teamsList,
  teamUpdate,
} from './api/team';
import {
  invitationsList,
  teamInvitationsDelete,
  teamInvitationsList,
  teamInvitationsUpdate,
} from './api/teamInvitations';
import {
  joinRequestsList,
  joinRequestUpdate,
  teamJoinRequestsList,
} from './api/teamJoinRequests';
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
  app.get('/logout', asyncWrapper(logout));

  app.post('/api/search', asyncWrapper(search));

  app.get('/api/me', asyncWrapper(me));
  app.patch('/api/me', asyncWrapper(meUpdate));

  app.get('/api/teams', asyncWrapper(teamsList));
  app.post('/api/teams', asyncWrapper(teamCreate));
  app.get('/api/teams/:id', asyncWrapper(teamSingle));
  app.patch('/api/teams/:id', asyncWrapper(teamUpdate));
  app.delete('/api/teams/:id', asyncWrapper(teamDelete));
  app.post('/api/teams/:id/invite', asyncWrapper(teamInviteUser));
  app.post('/api/teams/:id/join', asyncWrapper(teamRequestJoin));

  app.get('/api/teams/:id/invitations', asyncWrapper(teamInvitationsList));
  app.get('/api/teams/:id/join_requests', asyncWrapper(teamJoinRequestsList));

  app.get('/api/team_invitations', asyncWrapper(invitationsList));
  app.patch('/api/team_invitations/:id', asyncWrapper(teamInvitationsUpdate));
  app.delete('/api/team_invitations/:id', asyncWrapper(teamInvitationsDelete));

  app.get('/api/join_requests', asyncWrapper(joinRequestsList));
  app.patch('/api/join_requests/:id', asyncWrapper(joinRequestUpdate));

  app.get('/api/games', asyncWrapper(gamesList));
  app.post('/api/games/:id/account', asyncWrapper(gameAccountLink));
  app.delete('/api/games/:id/account', asyncWrapper(gameAccountDelete));

  app.get('/api/tournaments', asyncWrapper(tournamentsList));
  app.post('/api/tournaments', asyncWrapper(tournamentCreate));
  app.patch('/api/tournaments/:id', asyncWrapper(tournamentUpdate));
  app.delete('/api/tournaments/:id', asyncWrapper(tournamentDelete));

  app.get('/api/players', asyncWrapper(playersList));
  app.get('/api/players/:id', asyncWrapper(playerGet));

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
