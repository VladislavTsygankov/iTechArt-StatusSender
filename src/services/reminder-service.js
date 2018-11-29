import { Reminder } from '../db/models';
import createIfNotExist from './helpers/create-if-not-exist';

const createReminder = async (value, id) => {
  return createIfNotExist(Reminder, { value: value, UserId: id }, { value: value, UserId: id });
};

const removeReminder = async id => {
  return await Reminder.destroy({ where: { id } });
};

const updateReminder = async reminder => {
  const isUpdatedReminder = await Reminder.update(
    { value: reminder.value, UserId: reminder.userId },
    { where: { Id: reminder.id } }
  );

  if (isUpdatedReminder[0] === 1) {
    return {
      id: +reminder.id,
      value: reminder.value,
      UserId: reminder.userId,
    };
  } else {
    throw new Error('Reminder can not be updated');
  }
};

const getReminders = async id => {
  return await Reminder.findAll({ where: { UserId: id } });
};

export default { getReminders, createReminder, updateReminder, removeReminder };
