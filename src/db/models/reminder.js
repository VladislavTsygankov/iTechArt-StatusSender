import Sequelize from 'sequelize';
import DataTypes from 'sequelize';
import db from '../db-connection';

const Reminder = db.define(
  'reminder',
  {
    UserId: { type: Sequelize.INTEGER },
    value: { type: DataTypes.TIME },
  },
  { createdAt: false, updatedAt: false },
);

export default Reminder;