'use strict';

import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Team, User } from '.';

interface MembershipAttributes {
  id: number;
  user_id: number;
  team_id: number;
}

type MembershipCreationAttributes = Optional<MembershipAttributes, 'id'>;

export function setupMembership(sequelize: Sequelize) {
  class Membership
    extends Model<MembershipAttributes, MembershipCreationAttributes>
    implements MembershipAttributes
  {
    public id!: number;
    public user_id!: number;
    public team_id!: number;
  }

  Membership.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Team,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Membership',
      underscored: true,
    }
  );
  return Membership;
}
