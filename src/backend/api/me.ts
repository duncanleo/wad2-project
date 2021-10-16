import { Request, Response } from 'express';
import Joi from 'joi';

import { ErrorBadRequest, ErrorUnauthorized } from '../errors';
import { Game, GameAccount, Membership } from '../model';
import getRequestContext from '../util/getRequestContext';

export default async function me(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const memberships = await Membership.findAll({
    attributes: ['id', 'role', 'team_id'],
    where: {
      user_id: user.id,
    },
  });

  const gameAccounts = await GameAccount.findAll({
    attributes: ['id', 'game_id', 'data', 'updated_at'],
    where: {
      user_id: user.id,
    },
    include: [
      {
        model: Game,
        as: 'game',
        attributes: ['id', 'name', 'developer', 'release_year', 'internal_id'],
      },
    ],
  });

  res
    .status(200)
    .json({
      id: user.id,
      email: user.email,
      display_name: user.display_name,
      type: user.type,
      memberships,
      gameAccounts,
    })
    .end();
  return;
}

interface MeUpdatePayload {
  display_name: string | undefined;
  email: string | undefined;
}

const MeUpdatePayloadSchema = Joi.object<MeUpdatePayload>({
  display_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
});

export async function meUpdate(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = MeUpdatePayloadSchema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { display_name, email } = validationResult.value as MeUpdatePayload;

  await user.update({
    display_name,
    email,
  });

  res.status(204).end();
}
