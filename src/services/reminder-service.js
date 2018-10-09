import momentService from './moment-service';
import { Reminder } from '../db/models';

const createReminder = async reminderData => {
  let reminder = await Reminder.findOne({ where: { ...reminderData } });

  if (!reminder) {
    reminder = new Reminder({ ...reminderData });

    return await reminder.save();
  } else {
    throw new Error('Reminder is already exist');
  }
};

const removeReminder = async id => {
  return await Reminder.destroy({ where: { id } });
};

const updateReminder = async (id, reminderData) => {
  await Reminder.update(reminderData, { where: { id } });

  return await Reminder.findOne({ attributes: ['Id', 'value'], where: { id } });
};

const getReminders = async () => {
  return await Reminder.findAll({ attributes: ['Id', 'value'] }).map(reminder => {
    reminder.value = momentService.convertTime(reminder.value);

    return reminder;
  });
};

const getRemindersByUserId = async id => {
  return await Reminder.findAll({ attributes: ['Id', 'value'], where: { UserId: id } }).map(reminder => {
    reminder.value = momentService.convertTime(reminder.value);

    return reminder;
  });
};

export default { getReminders, createReminder, updateReminder, removeReminder, getRemindersByUserId };
