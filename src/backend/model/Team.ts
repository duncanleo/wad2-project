import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import {
  Membership,
  TeamInvitation,
  TeamJoinRequest,
  TournamentParticipation,
} from '.';

interface TeamAttributes {
  id: number;
  name: string;
  avatar: string | null;
  description: string | null;
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
    public description!: string | null;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public readonly memberships?: InstanceType<typeof Membership>[];
    public readonly participations?: InstanceType<
      typeof TournamentParticipation
    >[];
    public readonly invitations?: InstanceType<typeof TeamInvitation>[];
    public readonly join_requests?: InstanceType<typeof TeamJoinRequest>[];

    public static associations: {
      memberships: Association<Team, InstanceType<typeof Membership>>;
      participations: Association<
        Team,
        InstanceType<typeof TournamentParticipation>
      >;
      invitations: Association<InstanceType<typeof TeamInvitation>>;
      join_requests: Association<InstanceType<typeof TeamJoinRequest>>;
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
      description: {
        type: DataTypes.TEXT,
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
