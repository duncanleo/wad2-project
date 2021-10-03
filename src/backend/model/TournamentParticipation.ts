import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Team, Tournament } from '.';

interface TournamentParticipationAttributes {
  id: number;
  tournament_id: number;
  team_id: number;
}

type TournamentParticipationCreationAttributes = Optional<
  TournamentParticipationAttributes,
  'id'
>;

export function setupTournamentParticipation(sequelize: Sequelize) {
  class TournamentParticipation
    extends Model<
      TournamentParticipationAttributes,
      TournamentParticipationCreationAttributes
    >
    implements TournamentParticipationAttributes
  {
    public id!: number;
    public tournament_id!: number;
    public team_id!: number;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly tournament?: InstanceType<typeof Tournament>;
    public readonly team?: InstanceType<typeof Team>;

    public static associations: {
      tournament: Association<
        TournamentParticipation,
        InstanceType<typeof Tournament>
      >;
      team: Association<TournamentParticipation, InstanceType<typeof Team>>;
    };
  }

  TournamentParticipation.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      tournament_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Tournament,
          key: 'id',
        },
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Team,
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TournamentParticipation',
      underscored: true,
    }
  );
  return TournamentParticipation;
}

