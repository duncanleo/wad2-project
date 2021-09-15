import { Request, Response } from 'express';

import { ErrorUnauthorized } from '../errors';
import getRequestContext from '../util/getRequestContext';

export default async function me(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user != null) {
    res
      .status(200)
      .json({
        email: user.email,
        display_name: user.display_name,
      })
      .end();
    return;
  }

  throw new ErrorUnauthorized();
}
