import { Request, Response } from 'express';

import { ErrorForbidden, ErrorNotFound, ErrorUnauthorized } from '../errors';
import { Membership, Team, TeamJoinRequest, User } from '../model';
import getRequestContext from '../util/getRequestContext';

export async function teamJoinRequestsList(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const team = await Team.findOne({
    attributes: ['id'],
    where: {
      id,
    },
    include: [
      {
        model: TeamJoinRequest,
        as: 'join_requests',
        attributes: ['id', 'message', 'status'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'display_name', 'bio'],
          },
          {
            model: User,
            as: 'approver',
            attributes: ['id', 'display_name', 'bio'],
          },
        ],
      },
    ],
  });

  if (team == null) {
    throw new ErrorNotFound('invalid team');
  }

  const membership = await Membership.findOne({
    attributes: ['id', 'role', 'team_id', 'user_id'],
    where: {
      team_id: team.id,
      user_id: user.id,
    },
  });

  if (membership == null || membership.role !== 'leader') {
    throw new ErrorForbidden();
  }

  res.status(200).json({
    status: true,
    join_requests: team.join_requests,
  });
}

/**
 * List join requests that current user has made
 **/
export async function joinRequestsList(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const join_requests = await TeamJoinRequest.findAll({
    attributes: ['id', 'team_id', 'message'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'display_name', 'bio'],
      },
    ],
    where: {
      user_id: user.id,
    },
  });

  res.status(200).json({
    status: true,
    join_requests,
  });
}
