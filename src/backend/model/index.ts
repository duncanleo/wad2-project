import dotenv from 'dotenv';
import { Options, Sequelize } from 'sequelize';

import config from '../model/config.json';
import { setupGame } from './Game';
import { setupMembership } from './Membership';
import { setupTeam } from './Team';
import { setupTournament } from './Tournament';
import { setupTournamentParticipation } from './TournamentParticipation';
import { setupUser } from './User';

dotenv.config();

const { NODE_ENV } = process.env;

if (
  NODE_ENV == null ||
  !['production', 'development', 'test'].includes(NODE_ENV)
) {
  throw new Error('invalid NODE_ENV');
}

const dbConfig = config[NODE_ENV as keyof typeof config];

let sequelize;

if ('use_env_variable' in dbConfig) {
  const connectionUri = process.env[dbConfig.use_env_variable];

  if (connectionUri == null) {
    throw new Error(`${dbConfig.use_env_variable} not provided`);
  }

  sequelize = new Sequelize(connectionUri, dbConfig as Options);
} else {
  sequelize = new Sequelize(dbConfig as Options);
}

/**
 * Model setup
 **/
const User = setupUser(sequelize);

const Team = setupTeam(sequelize);

const Membership = setupMembership(sequelize);

const Game = setupGame(sequelize);

const Tournament = setupTournament(sequelize);

const TournamentParticipation = setupTournamentParticipation(sequelize);

Membership.belongsTo(User, {
  as: 'user',
  foreignKey: 'id',
});

Membership.belongsTo(Team, {
  as: 'team',
  foreignKey: 'id',
});

User.hasMany(Membership, {
  as: 'memberships',
  foreignKey: 'user_id',
});

Team.hasMany(Membership, {
  as: 'memberships',
  foreignKey: 'team_id',
});

Tournament.belongsTo(Game, {
  as: 'game',
  foreignKey: 'id',
});

Game.hasMany(Tournament, {
  as: 'tournaments',
  foreignKey: 'game_id',
});

TournamentParticipation.belongsTo(Tournament, {
  as: 'tournament',
  foreignKey: 'id',
});

TournamentParticipation.belongsTo(Team, {
  as: 'teams',
  foreignKey: 'id',
});

Tournament.hasMany(TournamentParticipation, {
  as: 'participations',
  foreignKey: 'tournament_id',
});

Team.hasMany(TournamentParticipation, {
  as: 'participations',
  foreignKey: 'team_id',
});

Tournament.belongsTo(User, {
  as: 'owner',
  foreignKey: 'id',
});

User.hasMany(Tournament, {
  as: 'tournamentsOwned',
  foreignKey: 'owner_id',
});

export {
  Game,
  Membership,
  sequelize,
  Team,
  Tournament,
  TournamentParticipation,
  User,
};
