'use strict';

import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  display_name: string;
  email: string;
  password: string;
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

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
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
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
}
