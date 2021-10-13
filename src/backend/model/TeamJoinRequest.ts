import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { Team, User } from '.';

interface TeamJoinRequestAttributes {
  id: number;
  team_id: number;
  user_id: number;
  approver_id: number;
  message: string | null;
  status: 'approved' | 'rejected' | 'idle';
}

type TeamJoinRequestCreationAttributes = Optional<
  TeamJoinRequestAttributes,
  'id' | 'approver_id'
>;

export default function setupTeamJoinRequest(sequelize: Sequelize) {
  class TeamJoinRequest
    extends Model<TeamJoinRequestAttributes, TeamJoinRequestCreationAttributes>
    implements TeamJoinRequestAttributes
  {
    public id!: number;
    public team_id!: number;
    public user_id!: number;
    public approver_id!: number;
    public message!: string | null;
    public status!: 'approved' | 'rejected' | 'idle';

    public readonly user?: InstanceType<typeof User>;
    public readonly approver?: InstanceType<typeof User>;
    public readonly team?: InstanceType<typeof User>;

    public static associations: {
      user: Association<TeamJoinRequest, InstanceType<typeof User>>;
      approver: Association<TeamJoinRequest, InstanceType<typeof User>>;
      team: Association<TeamJoinRequest, InstanceType<typeof Team>>;
    };
  }

  TeamJoinRequest.init(
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
      approver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('approved', 'rejected', 'idle'),
        allowNull: false,
        defaultValue: 'idle',
      },
    },
    {
      sequelize,
      modelName: 'TeamJoinRequest',
      underscored: true,
    }
  );
  return TeamJoinRequest;
}
