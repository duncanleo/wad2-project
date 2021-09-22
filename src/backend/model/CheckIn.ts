'use strict';

import { Association, DataTypes, Model, Sequelize } from 'sequelize';

import { Place, User } from '.';

interface CheckInAttributes {
  user_id: number;
  place_id: number;
  data: object;
}

export function setupCheckIn(sequelize: Sequelize) {
  class CheckIn extends Model<CheckInAttributes> {
    public user_id!: number;
    public place_category_id!: number;

    public readonly place?: InstanceType<typeof Place>;
    public readonly user?: InstanceType<typeof User>;

    public static associations: {
      place: Association<CheckIn, InstanceType<typeof Place>>;
      user: Association<CheckIn, InstanceType<typeof User>>;
    };
  }

  CheckIn.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
        },
        allowNull: false,
      },
      place_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Place,
        },
        allowNull: false,
      },
      data: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CheckIn',
      underscored: true,
    }
  );
  return CheckIn;
}
