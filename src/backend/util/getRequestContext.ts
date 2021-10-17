import { Request } from 'express';

import { Membership, Team, User } from '../model';

export default async function getRequestContext(req: Request) {
  let user = null;

  if (req.session != null) {
    const { userId } = req.session;

    if (userId != null) {
      user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Membership,
            as: 'memberships',
            include: [
              {
                model: Team,
                as: 'team',
              },
            ],
          },
        ],
      });
    }
  }

  return {
    user,
  };
}
