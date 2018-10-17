import momentService from './moment-service';
import { Reminder } from '../db/models';

const createReminder = async (value, id) => {
  let reminder = await Reminder.findOne({ where: { value, UserId: id } });

  if (!reminder) {
    return  await Reminder.create({ value, UserId: id });
  } else {
    throw new Error('Reminder is already exist');
  }
};

const removeReminder = async id => {
  return await Reminder.destroy({ where: { id } });
};

const updateReminder = async (id, value, userId) => {
  await Reminder.update({ value, UserId: userId }, { where: { id } });

  return await Reminder.findOne({ attributes: ['Id', 'value'], where: { id } });
};

const getReminders = async id => {
  return await Reminder.findAll({ where: { UserId: id } }).map(reminder => {
    reminder.value = momentService.convertTime(reminder.value);

    return reminder;
  });
};

export default { getReminders, createReminder, updateReminder, removeReminder };
