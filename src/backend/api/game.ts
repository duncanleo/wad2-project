import { Request, Response } from 'express';

import { ErrorNotFound, ErrorUnauthorized } from '../errors';
import { Game, Tournament, User } from '../model';
import getRequestContext from '../util/getRequestContext';

export async function gamesList(req: Request, res: Response) {
  const games = await Game.findAll({
    attributes: [
      'id',
      'name',
      'developer',
      'internal_id',
      'banner_image',
      'banner_image_license',
      'logo_image',
      'logo_image_license',
      'background_image',
      'background_image_license',
    ],
  });

  res
    .status(200)
    .json({
      status: true,
      games,
    })
    .end();
}

export async function gameGet(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const game = await Game.findOne({
    attributes: [
      'id',
      'name',
      'developer',
      'internal_id',
      'banner_image',
      'banner_image_license',
      'logo_image',
      'logo_image_license',
      'background_image',
      'background_image_license',
    ],
    where: {
      id,
    },
    include: [
      {
        model: Tournament,
        as: 'tournaments',
        attributes: [
          'id',
          'name',
          'region',
          'prize_pool',
          'start_at',
          'end_at',
          'game_id',
        ],
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'display_name'],
          },
        ],
      },
    ],
  });

  if (game == null) {
    throw new ErrorNotFound();
  }

  res.status(200).json({
    status: true,
    game,
  });
}
