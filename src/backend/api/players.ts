import { Request, Response } from 'express';

import { ErrorForbidden, ErrorUnauthorized } from '../errors';
import { Game, GameAccount, Membership, Team, User } from '../model';
import getRequestContext from '../util/getRequestContext';

export async function playerGet(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const player = await User.findOne({
    where: {
      id,
    },
    attributes: ['id', 'display_name', 'bio'],
    include: [
      {
        model: GameAccount,
        as: 'gameAccounts',
        attributes: ['id', 'data', 'updated_at'],
        include: [
          {
            model: Game,
            as: 'game',
            attributes: [
              'id',
              'name',
              'developer',
              'release_year',
              'internal_id',
            ],
          },
        ],
      },
      {
        model: Membership,
        as: 'memberships',
        attributes: ['id', 'team_id', 'role'],
        include: [
          {
            model: Team,
            as: 'team',
            attributes: ['id', 'name', 'avatar', 'description', 'created_at'],
          },
        ],
      },
    ],
  });

  if (player == null) {
    throw new ErrorForbidden();
  }

  res
    .status(200)
    .json({
      status: true,
      player,
    })
    .end();
}
