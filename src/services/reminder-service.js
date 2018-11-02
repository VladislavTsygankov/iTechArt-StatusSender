import momentService from './moment-service';
import { Reminder } from '../db/models';

const createReminder = async (value, id) => {
  const reminderValue = momentService.convertTimeFromSeconds(value);

  let reminder = await Reminder.findOne({ where: { value: reminderValue, UserId: id } });

  if (!reminder) {
    return await Reminder.create({ value: reminderValue, UserId: id });
  } else {
    throw new Error('Reminder is already exist');
  }
};

const removeReminder = async id => {
  return await Reminder.destroy({ where: { id } });
};

const updateReminder = async (id, value, userId) => {
  const reminderValue = momentService.convertTimeFromSeconds(value);

  await Reminder.update({ value: reminderValue, UserId: userId }, { where: { id } });

  return {
    id: +id,
    value: reminderValue,
    UserId: userId,
  };
};

const getReminders = async id => {
  return await Reminder.findAll({ where: { UserId: id } }).map(reminder => {
    reminder.value = momentService.convertTime(reminder.value);

    return reminder;
  });
};

export default { getReminders, createReminder, updateReminder, removeReminder };
