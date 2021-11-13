import { Request, Response } from 'express';
import Joi from 'joi';
import sampleSize from 'lodash/sampleSize';

import { ErrorBadRequest, ErrorForbidden, ErrorUnauthorized } from '../errors';
import { Game, GameAccount, Membership, Team, User } from '../model';
import getRequestContext from '../util/getRequestContext';

interface PlayersListPayload {
  explore: boolean;
}

const PlayersListPayloadSchema = Joi.object<PlayersListPayload>({
  explore: Joi.boolean().allow(true),
});

export async function playersList(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = PlayersListPayloadSchema.validate(req.body);
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const players = await User.findAll({
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
              'banner_image',
              'banner_image_license',
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

  res
    .status(200)
    .json({
      status: true,
      players: sampleSize(players, 5),
    })
    .end();
}

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
              'banner_image',
              'banner_image_license',
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
