import { Request, Response } from 'express';

import { Game } from '../model';

export async function gamesList(req: Request, res: Response) {
  const games = await Game.findAll({
    attributes: ['id', 'name', 'developer', 'internal_id'],
  });

  res
    .status(200)
    .json({
      status: true,
      games,
    })
    .end();
}
