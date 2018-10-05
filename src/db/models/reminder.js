import DataTypes from 'sequelize';
import db from '../db-connection';

const Reminder = db.define(
  'Reminder',
  {
    value: { type: DataTypes.TIME },
  },
  { createdAt: false, updatedAt: false },
);

export default Reminder;