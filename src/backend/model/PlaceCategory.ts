'use strict';

import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Place } from '.';

interface PlaceCategoryAttributes {
  id: number;
  name: string;
  data: object;
  remote_id: string;
}

type PlaceCategoryCreationAttributes = Optional<PlaceCategoryAttributes, 'id'>;

export function setupPlaceCategory(sequelize: Sequelize) {
  class PlaceCategory extends Model<
    PlaceCategoryAttributes,
    PlaceCategoryCreationAttributes
  > {
    public id!: number;
    public name!: string;
    public data!: object;
    public remote_id!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly places?: InstanceType<typeof Place>[];

    public static associations: {
      places: Association<PlaceCategory, InstanceType<typeof Place>>;
    };
  }

  PlaceCategory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      data: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      remote_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'PlaceCategory',
      underscored: true,
    }
  );
  return PlaceCategory;
}
