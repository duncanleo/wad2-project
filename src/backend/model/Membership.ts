'use strict';

import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Team, User } from '.';

interface MembershipAttributes {
  id: number;
  user_id: number;
  team_id: number;
  role: 'leader' | 'member';
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
    public role!: 'leader' | 'member';

    public readonly user?: InstanceType<typeof User>;
    public readonly team?: InstanceType<typeof Team>;

    public static associations: {
      user: Association<Membership, InstanceType<typeof User>>;
      team: Association<Membership, InstanceType<typeof Team>>;
    };
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
      role: {
        type: DataTypes.ENUM('leader', 'member'),
        allowNull: false,
        defaultValue: 'member',
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
