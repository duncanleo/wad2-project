import { Request, Response } from 'express';
import Joi from 'joi';

import { SUPPORTED_GAMES } from '../../constants';
import { ErrorBadRequest, ErrorNotFound, ErrorUnauthorized } from '../errors';
import apexLegends from '../games/apexLegends';
import codmw2019 from '../games/codmw2019';
import dota2 from '../games/dota2';
import fortnite from '../games/fortnite';
import { Game, GameAccount } from '../model';
import getRequestContext from '../util/getRequestContext';

type GameAccountLinkPayload =
  | {
      type: SUPPORTED_GAMES.CODMW_2019;
      platform: 'psn' | 'steam' | 'xbl' | 'battle' | 'uno' | 'acti';
      gamertag: string;
    }
  | {
      type: SUPPORTED_GAMES.FORTNITE;
      gamertag: string;
    }
  | {
      type: SUPPORTED_GAMES.APEX_LEGENDS;
      gamertag: string;
      platform: 'psn' | 'origin' | 'xbl';
    }
  | {
      type: SUPPORTED_GAMES.DOTA2;
      gamertag: string;
    };

const GameAccountLinkPayloadSchema = Joi.alternatives().try(
  Joi.object<GameAccountLinkPayload>({
    type: Joi.valid(SUPPORTED_GAMES.CODMW_2019),
    platform: Joi.string()
      .valid('psn', 'steam', 'xbl', 'battle', 'uno', 'acti')
      .required(),
    gamertag: Joi.string().required(),
  }),
  Joi.object<GameAccountLinkPayload>({
    type: Joi.valid(SUPPORTED_GAMES.FORTNITE),
    gamertag: Joi.string().required(),
  }),
  Joi.object<GameAccountLinkPayload>({
    type: Joi.valid(SUPPORTED_GAMES.APEX_LEGENDS),
    gamertag: Joi.string().required(),
    platform: Joi.string().valid('psn', 'origin', 'xbl').required(),
  }),
  Joi.object<GameAccountLinkPayload>({
    type: Joi.valid(SUPPORTED_GAMES.DOTA2),
    gamertag: Joi.string().required(),
  })
);

export async function gameAccountLink(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const game = await Game.findOne({
    where: {
      id,
    },
  });

  if (game == null) {
    throw new ErrorNotFound();
  }

  const validationResult = GameAccountLinkPayloadSchema.validate({
    ...req.body,
    type: game.internal_id,
  });

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const payload = validationResult.value as GameAccountLinkPayload;

  const gameAccount = await GameAccount.findOne({
    where: {
      user_id: user.id,
      game_id: game.id,
    },
  });

  if (gameAccount != null) {
    throw new ErrorBadRequest('game account already exists');
  }

  let data = {};

  switch (payload.type) {
    case SUPPORTED_GAMES.CODMW_2019: {
      const { platform, gamertag } = payload;

      data = await codmw2019(platform, gamertag);
      break;
    }
    case SUPPORTED_GAMES.FORTNITE: {
      const { gamertag } = payload;
      data = await fortnite(gamertag);
      break;
    }
    case SUPPORTED_GAMES.APEX_LEGENDS: {
      const { gamertag, platform } = payload;

      data = await apexLegends(gamertag, platform);
      break;
    }
    case SUPPORTED_GAMES.DOTA2: {
      const { gamertag } = payload;
      data = await dota2(gamertag);
      break;
    }
    default: {
      throw new ErrorBadRequest('unsupported game');
    }
  }

  const account = await GameAccount.create({
    user_id: user.id,
    game_id: game.id,
    data,
  });

  res
    .status(200)
    .json({
      status: true,
      account,
    })
    .end();
}

export async function gameAccountDelete(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const game = await Game.findOne({
    where: {
      id,
    },
  });

  if (game == null) {
    throw new ErrorNotFound();
  }

  const gameAccount = await GameAccount.findOne({
    where: {
      user_id: user.id,
      game_id: game.id,
    },
  });

  if (gameAccount == null) {
    throw new ErrorBadRequest('game account does not exist');
  }

  await gameAccount.destroy();

  res.status(204).end();
}
