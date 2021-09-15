import { Request } from 'express';

import { User } from '../model';

export default async function getRequestContext(req: Request) {
  let user = null;

  if (req.session != null) {
    const { userId } = req.session;

    user = await User.findOne({
      where: {
        id: userId,
      },
    });
  }

  return {
    user,
  };
}
