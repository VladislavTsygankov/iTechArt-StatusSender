import DataTypes from 'sequelize';
import db from '../db-connection';

const Reminder = db.define(
  'Reminder',
  {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id',
    },
    value: { type: DataTypes.TIME },
  },
  { createdAt: false, updatedAt: false },
);

export default Reminder;
