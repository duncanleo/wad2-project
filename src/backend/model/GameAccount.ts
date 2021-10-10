import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Game, User } from '.';

interface GameAccountAttributes {
  id: number;
  user_id: number;
  game_id: number;
  data: Record<string, unknown>;
}

type GameAccountCreationAttributes = Optional<GameAccountAttributes, 'id'>;

export default function setupGameAccount(sequelize: Sequelize) {
  class GameAccount
    extends Model<GameAccountAttributes, GameAccountCreationAttributes>
    implements GameAccountAttributes
  {
    public id!: number;
    public user_id!: number;
    public game_id!: number;
    public data!: Record<string, unknown>;

    public readonly game?: InstanceType<typeof Game>;
    public readonly user?: InstanceType<typeof User>;

    public static associations: {
      game: Association<GameAccount, InstanceType<typeof Game>>;
      user: Association<GameAccount, InstanceType<typeof User>>;
    };
  }

  GameAccount.init(
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
        allowNull: false,
      },
      game_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Game,
          key: 'id',
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
      modelName: 'GameAccount',
      underscored: true,
    }
  );
  return GameAccount;
}
