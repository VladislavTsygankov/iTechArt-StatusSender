import Reminder from '../../../../db/models/reminder';

const findReminder = async (id, ctx, next) => {
  ctx.body = await Reminder.findById(id);

  return next();
};

export { findReminder };
