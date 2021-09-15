import { Request, Response } from 'express';

import getRequestContext from '../util/getRequestContext';

export default async function auth(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    res.status(401).end();
    return;
  }

  res.status(200).end();
}
