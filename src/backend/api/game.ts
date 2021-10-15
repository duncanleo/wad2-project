import { Request, Response } from 'express';

import { ErrorUnauthorized } from '../errors';
import { Game } from '../model';
import getRequestContext from '../util/getRequestContext';

export async function gamesList(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const games = await Game.findAll({
    attributes: ['id', 'name', 'developer'],
  });

  res
    .status(200)
    .json({
      status: true,
      games,
    })
    .end();
}
