import DataTypes from 'sequelize';
import db from '../db-connection';
import MomentService from '../../services/moment-service';

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
  {
    createdAt: false,
    updatedAt: false,
    hooks: {
      afterFind: reminders => {
        if (reminders && reminders.length > 0) {
          return reminders.map(reminder => {
            reminder.value = MomentService.formatTime(reminder.value);
          });
        }

        return reminders;
      },
    },
  }
);

export default Reminder;
