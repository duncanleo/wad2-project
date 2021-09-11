import dotenv from 'dotenv';
import { Options, Sequelize } from 'sequelize';

import config from '../model/config.json';
import { setupUser } from './User';

dotenv.config();

const { DATABASE_URL, NODE_ENV } = process.env;

if (DATABASE_URL == null) {
  throw new Error('DATABASE_URL must be provided');
} else if (
  NODE_ENV == null ||
  !['production', 'development', 'test'].includes(NODE_ENV)
) {
  throw new Error('invalid NODE_ENV');
}

const dbConfig = config[NODE_ENV as keyof typeof config];

let sequelize;

if ('use_env_variable' in dbConfig) {
  sequelize = new Sequelize(dbConfig.use_env_variable);
} else {
  sequelize = new Sequelize(dbConfig as Options);
}

/**
 * Model setup
 **/
const User = setupUser(sequelize);

export { sequelize, User };
