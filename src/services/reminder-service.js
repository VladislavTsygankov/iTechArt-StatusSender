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

  return await Reminder.findById(id);
};

const getReminders = async id => {
  if (id) {
    return await Reminder.findAll({ where: { UserId: id } });
  }

  return await Reminder.findAll();
};

export default { getReminders, createReminder, updateReminder, removeReminder };
