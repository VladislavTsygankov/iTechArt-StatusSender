import DataTypes from 'sequelize';
import db from '../db-connection';

const StatusHistory = db.define(
  'StatusHistory',
  {
    status: { type: db.Sequelize.STRING },
    date: { type: db.Sequelize.DATEONLY },
    time: { type: DataTypes.TIME },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export default StatusHistory;
