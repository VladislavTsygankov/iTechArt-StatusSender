import DataTypes from 'sequelize';
import db from '../db-connection';
import MomentService from '../../services/moment-service';

const StatusHistory = db.define(
  'StatusHistory',
  {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id',
    },
    status: { type: db.Sequelize.STRING(4000) },
    date: { type: db.Sequelize.DATEONLY },
    time: { type: DataTypes.TIME },
  },
  {
    createdAt: false,
    updatedAt: false,
    hooks: {
      afterFind: statuses => {
        if (statuses && statuses.length > 0) {
          return statuses.map(status => {
            status.time = MomentService.formatTime(status.time);

            return status;
          });
        }

        if (statuses) {
          statuses.time = MomentService.formatTime(statuses.time);

          return statuses;
        }

        return statuses;
      },
    },
    scopes: {
      today: {
        where: {
          date: MomentService.getCurrentUTCDate().date,
        },
      },
    },
  }
);

export default StatusHistory;
