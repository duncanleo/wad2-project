import { Request, Response } from 'express';
import Joi from 'joi';
import { Op, Sequelize } from 'sequelize';

import { ErrorBadRequest, ErrorForbidden } from '../errors';
import { Game, Membership, Team, Tournament, User } from '../model';
import getRequestContext from '../util/getRequestContext';

interface SearchPayload {
  term: string;
}

const SearchPayloadSchema = Joi.object<SearchPayload>({
  term: Joi.string().required(),
});

export async function search(req: Request, res: Response) {
  const context = await getRequestContext(req);

  const { user } = context;

  if (user == null) {
    throw new ErrorForbidden();
  }

  const validationResult = SearchPayloadSchema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { term } = validationResult.value as SearchPayload;

  const queryTerm = `%${term}%`;

  const teams = await Team.findAll({
    attributes: [
      'id',
      'name',
      'avatar',
      'created_at',
      [
        Sequelize.fn('COUNT', Sequelize.col('memberships.id')),
        'memberships_count',
      ],
    ],
    include: [
      {
        model: Membership,
        as: 'memberships',
        attributes: [],
        where: {
          user_id: user.id,
        },
      },
    ],
    group: ['Team.id'],
    where: {
      name: {
        [Op.iLike]: queryTerm,
      },
    },
  });

  const players = await User.findAll({
    attributes: ['id', 'display_name', 'bio'],
    where: {
      display_name: {
        [Op.iLike]: queryTerm,
      },
      type: 'gamer',
    },
  });

  const tournaments = await Tournament.findAll({
    attributes: [
      'id',
      'name',
      'region',
      'prize_pool',
      'banner_image',
      'banner_image_license',
    ],
    where: {
      name: {
        [Op.iLike]: queryTerm,
      },
    },
    include: [
      {
        model: Game,
        as: 'game',
        attributes: [
          'id',
          'developer',
          'internal_id',
          'banner_image',
          'banner_image_license',
          'logo_image',
          'logo_image_license',
          'background_image',
          'background_image_license',
        ],
      },
      {
        model: User,
        as: 'owner',
        attributes: ['id', 'display_name'],
      },
    ],
  });

  res
    .status(200)
    .json({
      status: true,
      teams,
      players,
      tournaments,
    })
    .end();
}
