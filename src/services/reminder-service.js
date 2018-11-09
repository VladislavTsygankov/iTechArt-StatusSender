import momentService from './moment-service';
import { Reminder } from '../db/models';

const createReminder = async (value, id) => {
  const reminderValue = momentService.convertTimeFromSeconds(value);

  let reminder = await Reminder.findOne({
    where: { value: reminderValue, UserId: id },
  });

  if (!reminder) {
    return await Reminder.create({ value: reminderValue, UserId: id });
  } else {
    throw new Error('Reminder is already exists');
  }
};

const removeReminder = async id => {
  return await Reminder.destroy({ where: { id } });
};

const updateReminder = async reminder => {
  const reminderValue = momentService.convertTimeFromSeconds(reminder.value);

  const isUpdatedReminder = await Reminder.update(
    { value: reminderValue, UserId: reminder.userId },
    { where: { Id: reminder.id } }
  );

  if (isUpdatedReminder[0] === 1) {
    return {
      id: +reminder.id,
      value: reminderValue,
      UserId: reminder.userId,
    };
  } else {
    throw new Error('Reminder can not be updated');
  }
};

const getReminders = async id => {
  return await Reminder.findAll({ where: { UserId: id } }).map(reminder => {
    reminder.value = momentService.convertTime(reminder.value);

    return reminder;
  });
};

export default { getReminders, createReminder, updateReminder, removeReminder };
