import { Request, Response } from 'express';

import { ErrorUnauthorized } from '../errors';
import { GameAccount, Membership } from '../model';
import getRequestContext from '../util/getRequestContext';

export default async function me(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user != null) {
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
    });

    res
      .status(200)
      .json({
        email: user.email,
        display_name: user.display_name,
        type: user.type,
        memberships,
        gameAccounts,
      })
      .end();
    return;
  }

  throw new ErrorUnauthorized();
}
