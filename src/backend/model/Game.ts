import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Tournament } from '.';

interface GameAttributes {
  id: number;
  name: string;
  developer: string;
  release_year: number;
  banner_image: string | null;
  banner_image_license: string | null;
}

type GameCreationAttributes = Optional<GameAttributes, 'id'>;

export function setupGame(sequelize: Sequelize) {
  class Game
    extends Model<GameAttributes, GameCreationAttributes>
    implements GameAttributes
  {
    public id!: number;
    public name!: string;
    public developer!: string;
    public release_year!: number;
    public banner_image!: string | null;
    public banner_image_license!: string | null;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly tournaments?: InstanceType<typeof Tournament>[];

    public static associations: {
      tournaments: Association<Game, InstanceType<typeof Tournament>>;
    };
  }

  Game.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      developer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      release_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      banner_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      banner_image_license: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Game',
      underscored: true,
    }
  );
  return Game;
}
