import momentService from './moment-service';
import { Reminder } from '../db/models';
import createIfNotExist from './helpers/create-if-not-exist';

const createReminder = async (value, id) => {
  const reminderValue = momentService.convertTimeFromSeconds(value);

  return createIfNotExist(
    Reminder,
    { value: reminderValue, UserId: id },
    { value: reminderValue, UserId: id }
  );
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
  return await Reminder.findAll({ where: { UserId: id } });
}


export default { getReminders, createReminder, updateReminder, removeReminder };
