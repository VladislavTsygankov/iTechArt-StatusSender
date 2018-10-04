import Reminder from '../db/models/reminder';

const createReminder = async reminderData => {
  let reminder = Reminder.findOne({ where: { ...reminderData } });

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
  await Reminder.update(reminderData, {
    where: {
      id,
    },
  });

  return await Reminder.findById(id);
};

export default { createReminder, updateReminder, removeReminder };
