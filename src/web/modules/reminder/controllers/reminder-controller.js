import HttpStatus from 'http-status';
import ReminderService from '../../../../services/reminder-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const get = async ctx => {
  ctx.body = await ReminderService.getReminders(ctx.user.id);
  ctx.status = HttpStatus.OK;
  logger.log(LoggerLevels.DEBUG, `Reminders sent: ${JSON.stringify(ctx.body)}`);
};

const post = async ctx => {
  ctx.body = await ReminderService.createReminder(
    ctx.request.body.value,
    ctx.user.id
  );
  ctx.status = HttpStatus.OK;
  logger.log(LoggerLevels.DEBUG, 'New reminder created');
};

const put = async ctx => {
  ctx.body = await ReminderService.updateReminder({
    id: ctx.params.id,
    value: ctx.request.body.value,
    userId: ctx.user.id,
  });
  ctx.status = HttpStatus.ACCEPTED;
  logger.log(
    LoggerLevels.DEBUG,
    `Reminder with id:${ctx.params.id} updated to ${JSON.stringify(ctx.body)}`
  );
};

const remove = async ctx => {
  await ReminderService.removeReminder(ctx.params.id);
  ctx.status = HttpStatus.NO_CONTENT;
  logger.log(LoggerLevels.DEBUG, 'Reminder was removed');
};

export default { get, post, put, remove };
