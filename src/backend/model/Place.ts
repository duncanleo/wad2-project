'use strict';

import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { PlaceCategory } from '.';

interface PlaceAttributes {
  id: number;
  name: string;
  data: object;
  remote_id: string;
}

type PlaceCreationAttributes = Optional<PlaceAttributes, 'id'>;

export function setupPlace(sequelize: Sequelize) {
  class Place extends Model<PlaceAttributes, PlaceCreationAttributes> {
    public id!: number;
    public name!: string;
    public data!: object;
    public remote_id!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly categories?: InstanceType<typeof PlaceCategory>[];

    public static associations: {
      categories: Association<Place, InstanceType<typeof PlaceCategory>>;
    };
  }

  Place.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      data: DataTypes.JSONB,
      remote_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Place',
      underscored: true,
    }
  );

  return Place;
}
