'use strict';

import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Membership } from '.';

interface UserAttributes {
  id: number;
  display_name: string;
  email: string;
  password: string;
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
    public type!: 'gamer' | 'organiser';

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly memberships?: InstanceType<typeof Membership>[];

    public static associations: {
      memberships: Association<User, InstanceType<typeof Membership>>;
    };
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      display_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.ENUM('gamer', 'organiser'),
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
}
