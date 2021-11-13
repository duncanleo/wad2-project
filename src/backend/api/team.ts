import { Request, Response } from 'express';
import Joi from 'joi';
import sampleSize from 'lodash/sampleSize';
import { Sequelize } from 'sequelize';

import {
  ErrorBadRequest,
  ErrorForbidden,
  ErrorNotFound,
  ErrorUnauthorized,
} from '../errors';
import {
  Game,
  GameAccount,
  Membership,
  Team,
  TeamInvitation,
  TeamJoinRequest,
  User,
} from '../model';
import getRequestContext from '../util/getRequestContext';

interface TeamsListParams {
  self: boolean;
  explore: boolean;
}

const TeamsListParamsSchema = Joi.object({
  self: Joi.boolean().default(false),
  explore: Joi.boolean().default(false),
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

  const { self, explore } = validationResult.value as TeamsListParams;

  let teams;

  if (self) {
    teams = await Team.findAll({
      attributes: [
        'id',
        'name',
        'avatar',
        'created_at',
        [
          Sequelize.fn('COUNT', Sequelize.col('memberships.id')),
          'memberships_count',
        ],
      ],
      include: [
        {
          model: Membership,
          as: 'memberships',
          attributes: [],
          where: {
            user_id: user.id,
          },
        },
      ],
      group: ['Team.id'],
    });
  } else {
    teams = await Team.findAll({
      attributes: [
        'id',
        'name',
        'avatar',
        'created_at',
        [
          Sequelize.fn('COUNT', Sequelize.col('memberships.id')),
          'memberships_count',
        ],
        [
          Sequelize.literal(
            `
            (
              SELECT
              CASE WHEN EXISTS
              (
                SELECT id
                FROM memberships
                WHERE team_id = "Team"."id"
                AND user_id = :user_id
              )
              THEN 1
              ELSE 0
              END
            )
            `
          ),
          'is_member',
        ],
        [
          Sequelize.literal(
            `
            (
              SELECT status
              FROM team_join_requests
              WHERE team_id = "Team"."id"
              AND user_id = :user_id
            )
            `
          ),
          'join_request_status',
        ],
      ],
      include: [
        {
          model: Membership,
          as: 'memberships',
          attributes: [],
        },
      ],
      group: ['Team.id'],
      replacements: {
        user_id: user.id,
      },
    });
  }

  if (explore) {
    teams = sampleSize(teams, 3);
  }

  const teamsPatched = teams.map((team) => {
    const teamData = team.toJSON() as Record<string, any>;
    return {
      ...teamData,
      is_member: teamData.is_member === 1,
    };
  });

  res
    .status(200)
    .json({
      status: true,
      teams: teamsPatched,
    })
    .end();
}

export async function teamSingle(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const team = await Team.findOne({
    attributes: [
      'id',
      'name',
      'avatar',
      'created_at',
      [
        Sequelize.literal(
          `
            (
              SELECT
              CASE WHEN EXISTS
              (
                SELECT id
                FROM memberships
                WHERE team_id = "Team"."id"
                AND user_id = :user_id
              )
              THEN 1
              ELSE 0
              END
            )
            `
        ),
        'is_member',
      ],
      [
        Sequelize.literal(
          `
            (
              SELECT status
              FROM team_join_requests
              WHERE team_id = "Team"."id"
              AND user_id = :user_id
            )
            `
        ),
        'join_request_status',
      ],
    ],
    where: {
      id,
    },
    include: [
      {
        model: Membership,
        as: 'memberships',
        attributes: ['id'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'display_name', 'bio'],
            include: [
              {
                model: GameAccount,
                as: 'gameAccounts',
                attributes: ['id'],
                include: [
                  {
                    model: Game,
                    as: 'game',
                    attributes: ['id', 'name', 'developer', 'release_year'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    replacements: {
      user_id: user.id,
    },
  });

  if (team == null) {
    throw new ErrorNotFound();
  }

  res
    .status(200)
    .json({
      status: true,
      team,
    })
    .end();
}

interface TeamCreatePayload {
  name: string;
  description: string;
}

const TeamCreatePayloadSchema = Joi.object<TeamCreatePayload>({
  name: Joi.string().required(),
  description: Joi.string().default(null),
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

  const { name, description } = validationResult.value as TeamCreatePayload;

  const team = await Team.create({
    name,
    avatar: null,
    description,
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

interface TeamInviteUserPayload {
  user_id: number;
  message: string | null;
}

const TeamInviteUserPayloadSchema = Joi.object<TeamInviteUserPayload>({
  user_id: Joi.number().required(),
  message: Joi.string().optional().default(null),
});

export async function teamInviteUser(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamInviteUserPayloadSchema.validate(req.body);
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { user_id, message } = validationResult.value as TeamInviteUserPayload;

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

  const invitee = await User.findOne({
    where: {
      id: user_id,
    },
  });

  if (invitee == null) {
    throw new ErrorBadRequest('invalid user');
  }

  const inviteeMembership = await Membership.findOne({
    attributes: ['id', 'team_id', 'user_id'],
    where: {
      team_id: team.id,
      user_id: invitee.id,
    },
  });

  if (inviteeMembership != null) {
    throw new ErrorBadRequest('invitee is already in the team');
  }

  try {
    const invitation = await TeamInvitation.create({
      user_id,
      team_id: team.id,
      inviter_id: user.id,
      status: 'idle',
      message,
    });

    res
      .status(200)
      .json({
        status: true,
        invitation,
      })
      .end();
  } catch (e) {
    console.error(e);
    throw new ErrorBadRequest('invitation already exists');
  }
}

interface TeamRequestJoinPayload {
  message: string | null;
}

const TeamRequestJoinPayloadSchema = Joi.object<TeamRequestJoinPayload>({
  message: Joi.string().optional().default(null),
});

export async function teamRequestJoin(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamRequestJoinPayloadSchema.validate(req.body);
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { message } = validationResult.value as TeamRequestJoinPayload;

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
    attributes: ['id', 'team_id', 'user_id'],
    where: {
      team_id: team.id,
      user_id: user.id,
    },
  });

  if (membership != null) {
    throw new ErrorNotFound('user already part of team');
  }

  try {
    const joinRequest = await TeamJoinRequest.create({
      user_id: user.id,
      team_id: team.id,
      status: 'idle',
      message,
    });

    res
      .status(200)
      .json({
        status: true,
        join_request: joinRequest,
      })
      .end();
  } catch (e) {
    console.error(e);
    throw new ErrorBadRequest('request already exists');
  }
}
