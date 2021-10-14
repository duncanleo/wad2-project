'use strict';

import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import {
  GameAccount,
  Membership,
  TeamInvitation,
  TeamJoinRequest,
  Tournament,
} from '.';

interface UserAttributes {
  id: number;
  display_name: string;
  email: string;
  password: string;
  bio: string | null;
  type: 'gamer' | 'organiser';
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export function setupUser(sequelize: Sequelize) {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: number;
    public display_name!: string;
    public email!: string;
    public password!: string;
    public bio!: string | null;
    public type!: 'gamer' | 'organiser';

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly memberships?: InstanceType<typeof Membership>[];
    public readonly tournamentsOwned?: InstanceType<typeof Tournament>[];
    public readonly gameAccounts?: InstanceType<typeof GameAccount>[];
    public readonly team_invitations?: InstanceType<typeof TeamInvitation>[];
    public readonly team_join_requests?: InstanceType<typeof TeamJoinRequest>[];

    public static associations: {
      memberships: Association<User, InstanceType<typeof Membership>>;
      tournamentsOwned: Association<User, InstanceType<typeof Tournament>>;
      gameAccounts: Association<User, InstanceType<typeof GameAccount>>;
      team_invitations: Association<InstanceType<typeof TeamInvitation>>;
      team_join_requests: Association<InstanceType<typeof TeamJoinRequest>>;
    };
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('gamer', 'organiser'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
}
