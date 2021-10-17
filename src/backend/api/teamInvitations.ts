import { Request, Response } from 'express';
import Joi from 'joi';

import {
  ErrorBadRequest,
  ErrorForbidden,
  ErrorNotFound,
  ErrorUnauthorized,
} from '../errors';
import { Membership, Team, TeamInvitation, User } from '../model';
import getRequestContext from '../util/getRequestContext';

export async function teamInvitationsList(req: Request, res: Response) {
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
        model: TeamInvitation,
        as: 'invitations',
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
    invitations: team.invitations,
  });
}

interface TeamInvitationsUpdatePayload {
  status: 'accepted' | 'rejected';
}

const TeamInvitationsUpdatePayloadSchema =
  Joi.object<TeamInvitationsUpdatePayload>({
    status: Joi.string().valid('accepted', 'rejected'),
  });

export async function teamInvitationsUpdate(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamInvitationsUpdatePayloadSchema.validate(
    req.body
  );

  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { status } = validationResult.value as TeamInvitationsUpdatePayload;

  const { id } = req.params;

  const invitation = await TeamInvitation.findOne({
    where: {
      id,
      user_id: user.id,
    },
  });

  if (invitation == null) {
    throw new ErrorNotFound();
  }

  await invitation.update({ status });

  res.status(200).json({
    status: true,
    invitation,
  });
}

export async function teamInvitationsDelete(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const invitation = await TeamInvitation.findOne({
    where: {
      id,
      user_id: user.id,
    },
  });

  if (invitation == null) {
    throw new ErrorNotFound();
  }

  await invitation.destroy();

  res.status(200).json({
    status: true,
    invitation,
  });
}

/**
 * List invites that current user has received
 **/
export async function invitationsList(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const invitations = await TeamInvitation.findAll({
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
    invitations,
  });
}
