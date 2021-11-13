import { Request, Response } from 'express';
import Joi from 'joi';

import {
  ErrorBadRequest,
  ErrorForbidden,
  ErrorNotFound,
  ErrorUnauthorized,
} from '../errors';
import { Membership, Tournament, TournamentParticipation } from '../model';
import getRequestContext from '../util/getRequestContext';

export async function tournamentParticipationsList(
  req: Request,
  res: Response
) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const { id } = req.params;

  const tournamentParticipations = await TournamentParticipation.findAll({
    where: {
      team_id: id,
    },
  });

  res
    .status(200)
    .json({
      status: true,
      tournamentParticipations,
    })
    .end();
}

interface TeamParticipationCreatePayload {
  team_id: number;
}

const TeamParticipationCreatePayloadSchema =
  Joi.object<TeamParticipationCreatePayload>({
    team_id: Joi.number().required(),
  });

export async function tournamentParticipationCreate(
  req: Request,
  res: Response
) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamParticipationCreatePayloadSchema.validate(
    req.body
  );
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { id } = req.params;

  const tournament = await Tournament.findOne({
    where: {
      id,
    },
  });

  if (tournament == null) {
    throw new ErrorNotFound();
  }

  const { team_id } = validationResult.value as TeamParticipationCreatePayload;

  const membership = await Membership.findOne({
    where: {
      team_id,
      user_id: user.id,
    },
  });

  if (membership == null || membership.role !== 'leader') {
    throw new ErrorForbidden();
  }

  const tournamentParticipation = await TournamentParticipation.create({
    team_id,
    tournament_id: parseInt(id, 10),
  });

  res
    .status(200)
    .json({
      status: true,
      tournamentParticipation,
    })
    .end();
}

interface TeamParticipationDeletePayload {
  team_id: number;
}

const TeamParticipationDeletePayloadSchema =
  Joi.object<TeamParticipationDeletePayload>({
    team_id: Joi.number().required(),
  });

export async function tournamentParticipationDelete(
  req: Request,
  res: Response
) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = TeamParticipationDeletePayloadSchema.validate(
    req.body
  );
  if (validationResult.error) {
    throw new ErrorBadRequest(validationResult.error.message);
  }

  const { id } = req.params;

  const tournament = await Tournament.findOne({
    where: {
      id,
    },
  });

  if (tournament == null) {
    throw new ErrorNotFound();
  }

  const { team_id } = validationResult.value as TeamParticipationDeletePayload;

  const membership = await Membership.findOne({
    where: {
      team_id,
      user_id: user.id,
    },
  });

  if (membership == null || membership.role !== 'leader') {
    throw new ErrorForbidden();
  }

  const tournamentParticipation = await TournamentParticipation.findOne({
    where: {
      team_id,
      tournament_id: parseInt(id, 10),
    },
  });

  if (tournamentParticipation == null) {
    throw new ErrorNotFound();
  }

  await tournamentParticipation.destroy();

  res.status(204).end();
}
