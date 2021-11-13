import { Request, Response } from 'express';
import Joi from 'joi';

import {
  ErrorBadRequest,
  ErrorForbidden,
  ErrorNotFound,
  ErrorUnauthorized,
} from '../errors';
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

interface TeamJoinRequestUpdatePayload {
  status: 'accepted' | 'rejected';
}

const TeamJoinRequestUpdatePayloadSchema =
  Joi.object<TeamJoinRequestUpdatePayload>({
    status: Joi.string().valid('accepted', 'rejected'),
  });

export async function joinRequestUpdate(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const joinRequest = await TeamJoinRequest.findOne({
    where: {
      id,
    },
  });

  if (joinRequest == null) {
    throw new ErrorNotFound();
  }

  const membership = await Membership.findOne({
    where: {
      team_id: joinRequest.team_id,
      user_id: user.id,
    },
    attributes: ['id', 'role'],
  });

  if (membership == null || membership.role !== 'leader') {
    throw new ErrorForbidden('insufficient permissions');
  }

  const validationResult = await TeamJoinRequestUpdatePayloadSchema.validate(
    req.body
  );

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { status } = validationResult.value as TeamJoinRequestUpdatePayload;

  switch (status) {
    case 'accepted': {
      await joinRequest.update({
        status,
        approver_id: user.id,
      });

      await Membership.create({
        team_id: joinRequest.team_id,
        user_id: joinRequest.user_id,
        role: 'member',
      });
      break;
    }
    case 'rejected': {
      await joinRequest.update({
        status,
      });
      break;
    }
  }

  res.status(204).end();
}
