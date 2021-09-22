'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

import { Place, PlaceCategory } from '.';

interface PlacePlaceCategoryAttributes {
  place_id: number;
  place_category_id: number;
}

export function setupPlacePlaceCategory(sequelize: Sequelize) {
  class PlacePlaceCategory extends Model<PlacePlaceCategoryAttributes> {
    public place_id!: number;
    public place_category_id!: number;
  }

  PlacePlaceCategory.init(
    {
      place_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Place,
        },
      },
      place_category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: PlaceCategory,
        },
      },
    },
    {
      sequelize,
      modelName: 'PlacePlaceCategory',
      underscored: true,
    }
  );

  return PlacePlaceCategory;
}

