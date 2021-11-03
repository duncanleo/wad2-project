import { Request, Response } from 'express';
import Joi from 'joi';

import {
  ErrorBadRequest,
  ErrorForbidden,
  ErrorNotFound,
  ErrorUnauthorized,
} from '../errors';
import { Game, Tournament, User } from '../model';
import getRequestContext from '../util/getRequestContext';

interface TournamentsListParams {
  game_id?: number;
}

const TournamentsListParamsSchema = Joi.object<TournamentsListParams>({
  game_id: Joi.number().optional(),
});

export async function tournamentsList(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TournamentsListParamsSchema.validate(req.query);

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { game_id } = validationResult.value as TournamentsListParams;

  let tournaments;

  if (game_id != null) {
    tournaments = await Tournament.findAll({
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
          attributes: ['id', 'display_name', 'bio'],
        },
      ],
      where: {
        game_id,
      },
    });
  } else {
    tournaments = await Tournament.findAll({
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
          attributes: ['id', 'display_name', 'bio'],
        },
      ],
    });
  }

  res
    .status(200)
    .json({
      status: true,
      tournaments,
    })
    .end();
}

interface TournamentCreatePayload {
  name: string;
  region: string;
  prize_pool: number;
  banner_image: string | null;
  banner_image_license: string | null;
  game_id: number;
  start_at: Date;
  end_at: Date;
  url: string | null;
}

const TournamentCreatePayloadSchema = Joi.object<TournamentCreatePayload>({
  name: Joi.string().required(),
  region: Joi.string().required(),
  prize_pool: Joi.number().min(0).required(),
  banner_image: Joi.string().allow(null),
  banner_image_license: Joi.string().allow(null),
  game_id: Joi.number().required(),
  start_at: Joi.date().required(),
  end_at: Joi.date().min(Joi.ref('start_at')).required(),
  url: Joi.string().optional().allow(null).default(null),
});

export async function tournamentCreate(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  } else if (user.type !== 'organiser') {
    throw new ErrorForbidden('not organiser');
  }

  const validationResult = TournamentCreatePayloadSchema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const {
    name,
    region,
    prize_pool,
    banner_image,
    banner_image_license,
    game_id,
    start_at,
    end_at,
    url,
  } = validationResult.value as TournamentCreatePayload;

  // Check for game's existence
  const game = await Game.findOne({
    where: {
      id: game_id,
    },
  });

  if (game == null) {
    throw new ErrorBadRequest('invalid game');
  }

  const tournament = await Tournament.create({
    name,
    region,
    prize_pool,
    banner_image,
    banner_image_license,
    game_id: game.id,
    start_at: start_at,
    end_at: end_at,
    owner_id: user.id,
    url,
  });

  res
    .status(200)
    .json({
      status: true,
      tournament,
    })
    .end();
}

interface TournamentUpdatePayload {
  name?: string;
  region?: string;
  prize_pool?: number;
  banner_image?: string | null;
  banner_image_license?: string | null;
  game_id?: number;
  start_at?: Date;
  end_at?: Date;
}

const TournamentUpdatePayloadSchema = Joi.object<TournamentUpdatePayload>({
  name: Joi.string(),
  region: Joi.string(),
  prize_pool: Joi.number().min(0),
  banner_image: Joi.string().allow(null),
  banner_image_license: Joi.string().allow(null),
  game_id: Joi.number(),
  start_at: Joi.date().optional(),
  end_at: Joi.any().when('start_at', {
    is: Joi.date(),
    then: Joi.date().min(Joi.ref('start_at')).required(),
    otherwise: Joi.optional(),
  }),
});

export async function tournamentUpdate(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  } else if (user.type !== 'organiser') {
    throw new ErrorForbidden('not organiser');
  }

  const validationResult = TournamentUpdatePayloadSchema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const payload = validationResult.value as TournamentUpdatePayload;

  const { id } = req.params;

  const tournament = await Tournament.findOne({
    where: {
      id,
      owner_id: user.id,
    },
  });

  if (tournament == null) {
    throw new ErrorNotFound();
  }

  await tournament.update({ ...payload, owner_id: undefined });

  res
    .status(200)
    .json({
      status: true,
      tournament,
    })
    .end();
}

export async function tournamentDelete(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  } else if (user.type !== 'organiser') {
    throw new ErrorForbidden('not organiser');
  }

  const { id } = req.params;

  const tournament = await Tournament.findOne({
    where: {
      id,
      owner_id: user.id,
    },
  });

  if (tournament == null) {
    throw new ErrorNotFound('invalid tournament');
  }

  await tournament.destroy();

  res.status(204).end();
}
