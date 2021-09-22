import dotenv from 'dotenv';
import { Options, Sequelize } from 'sequelize';

import config from '../model/config.json';
import { setupCheckIn } from './CheckIn';
import { setupPlace } from './Place';
import { setupPlaceCategory } from './PlaceCategory';
import { setupPlacePlaceCategory } from './PlacePlaceCategory';
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

const Place = setupPlace(sequelize);

const PlaceCategory = setupPlaceCategory(sequelize);

const PlacePlaceCategory = setupPlacePlaceCategory(sequelize);

Place.belongsToMany(PlaceCategory, {
  through: PlacePlaceCategory,
  as: 'categories',
});
PlaceCategory.belongsToMany(Place, {
  through: PlacePlaceCategory,
  as: 'places',
});

const CheckIn = setupCheckIn(sequelize);

CheckIn.belongsTo(User, {
  as: 'user',
  foreignKey: 'id',
});
User.hasMany(CheckIn, {
  as: 'check_ins',
  foreignKey: 'user_id',
});

CheckIn.belongsTo(Place, {
  as: 'place',
  foreignKey: 'id',
});
Place.hasMany(CheckIn, {
  as: 'check_ins',
  foreignKey: 'place_id',
});

export { CheckIn, Place, PlaceCategory, PlacePlaceCategory, sequelize, User };
