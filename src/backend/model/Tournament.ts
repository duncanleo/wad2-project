import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Game, TournamentParticipation } from '.';

interface TournamentAttributes {
  id: number;
  name: string;
  region: string;
  prize_pool: number;
  banner_image: string | null;
  banner_image_license: string | null;
  game_id: number;
  start_at: Date;
  end_at: Date;
}

type TournamentCreationAttributes = Optional<TournamentAttributes, 'id'>;

export function setupTournament(sequelize: Sequelize) {
  class Tournament
    extends Model<TournamentAttributes, TournamentCreationAttributes>
    implements TournamentAttributes
  {
    public id!: number;
    public name!: string;
    public region!: string;
    public prize_pool!: number;
    public banner_image!: string | null;
    public banner_image_license!: string | null;
    public game_id!: number;
    public start_at!: Date;
    public end_at!: Date;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly game?: InstanceType<typeof Game>;
    public readonly participations?: InstanceType<
      typeof TournamentParticipation
    >[];

    public static associations: {
      game: Association<Tournament, InstanceType<typeof Game>>;
      participations: Association<
        Tournament,
        InstanceType<typeof TournamentParticipation>
      >;
    };
  }

  Tournament.init(
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
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prize_pool: {
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
      game_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Game,
          key: 'id',
        },
        allowNull: false,
      },
      start_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tournament',
      underscored: true,
    }
  );
  return Tournament;
}
