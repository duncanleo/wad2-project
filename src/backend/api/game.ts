import { Request, Response } from 'express';

import { Game } from '../model';

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
