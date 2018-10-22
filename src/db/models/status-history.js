import DataTypes from 'sequelize';
import db from '../db-connection';

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
  },
);

export default StatusHistory;
