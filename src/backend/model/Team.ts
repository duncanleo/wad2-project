import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Membership, TournamentParticipation } from '.';

interface TeamAttributes {
  id: number;
  name: string;
  avatar: string | null;
}

type TeamCreationAttributes = Optional<TeamAttributes, 'id'>;

export function setupTeam(sequelize: Sequelize) {
  class Team
    extends Model<TeamAttributes, TeamCreationAttributes>
    implements TeamAttributes
  {
    public id!: number;
    public name!: string;
    public avatar!: string | null;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly memberships?: InstanceType<typeof Membership>[];
    public readonly participations?: InstanceType<
      typeof TournamentParticipation
    >[];

    public static associations: {
      memberships: Association<Team, InstanceType<typeof Membership>>;
      participations: Association<
        Team,
        InstanceType<typeof TournamentParticipation>
      >;
    };
  }

  Team.init(
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
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Team',
      underscored: true,
    }
  );

  return Team;
}