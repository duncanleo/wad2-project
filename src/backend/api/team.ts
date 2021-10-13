import { Request, Response } from 'express';
import Joi from 'joi';

import {
  ErrorBadRequest,
  ErrorForbidden,
  ErrorNotFound,
  ErrorUnauthorized,
} from '../errors';
import { Membership, Team } from '../model';
import getRequestContext from '../util/getRequestContext';

interface TeamsListParams {
  self: boolean;
}

const TeamsListParamsSchema = Joi.object({
  self: Joi.boolean().default(false),
});

export async function teamsList(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamsListParamsSchema.validate(req.query);
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { self } = validationResult.value as TeamsListParams;

  let teams;

  if (self) {
    teams = await Team.findAll({
      include: [
        {
          model: Membership,
          as: 'memberships',
          where: {
            user_id: user.id,
          },
        },
      ],
    });
  } else {
    teams = await Team.findAll();
  }

  res
    .status(200)
    .json({
      status: true,
      teams,
    })
    .end();
}

interface TeamCreatePayload {
  name: string;
}

const TeamCreatePayloadSchema = Joi.object<TeamCreatePayload>({
  name: Joi.string().required(),
});

export async function teamCreate(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamCreatePayloadSchema.validate(req.body);
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { name } = validationResult.value as TeamCreatePayload;

  const team = await Team.create({
    name,
    avatar: null,
  });

  await Membership.create({
    user_id: user.id,
    team_id: team.id,
    role: 'leader',
  });

  res
    .status(200)
    .json({
      status: true,
      team,
    })
    .end();
}

interface TeamUpdatePayload {
  name?: string;
  avatar?: string;
}

const TeamUpdatePayloadSchema = Joi.object<TeamUpdatePayload>({
  name: Joi.string(),
  avatar: Joi.string(),
});

export async function teamUpdate(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamUpdatePayloadSchema.validate(req.body);
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { name, avatar } = validationResult.value as TeamUpdatePayload;

  const { id } = req.params;

  const membership = await Membership.findOne({
    attributes: ['id', 'role', 'team_id', 'user_id'],
    where: {
      team_id: id,
      user_id: user.id,
    },
  });

  if (membership == null || membership.role !== 'leader') {
    throw new ErrorForbidden();
  }

  const team = await Team.update(
    {
      name,
      avatar,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );

  res
    .status(200)
    .json({
      status: true,
      team,
    })
    .end();
}

export async function teamDelete(req: Request, res: Response) {
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

  await team.destroy();

  res.status(204).end();
}
