import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Team, User } from '.';

interface TeamInvitationAttributes {
  id: number;
  team_id: number;
  user_id: number;
  inviter_id: number;
  message: string | null;
  status: 'accepted' | 'rejected' | 'idle';
}

type TeamInvitationCreationAttributes = Optional<
  TeamInvitationAttributes,
  'id'
>;

export default function setupTeamInvitation(sequelize: Sequelize) {
  class TeamInvitation
    extends Model<TeamInvitationAttributes, TeamInvitationCreationAttributes>
    implements TeamInvitationAttributes
  {
    public id!: number;
    public team_id!: number;
    public user_id!: number;
    public inviter_id!: number;
    public message!: string | null;
    public status!: 'accepted' | 'rejected' | 'idle';

    public readonly user?: InstanceType<typeof User>;
    public readonly inviter?: InstanceType<typeof User>;
    public readonly team?: InstanceType<typeof User>;

    public static associations: {
      user: Association<TeamInvitation, InstanceType<typeof User>>;
      inviter: Association<TeamInvitation, InstanceType<typeof User>>;
      team: Association<TeamInvitation, InstanceType<typeof Team>>;
    };
  }

  TeamInvitation.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Team,
          key: 'id',
        },
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
        allowNull: false,
      },
      inviter_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('accepted', 'rejected', 'idle'),
        allowNull: false,
        defaultValue: 'idle',
      },
    },
    {
      sequelize,
      modelName: 'TeamInvitation',
      underscored: true,
    }
  );
  return TeamInvitation;
}
