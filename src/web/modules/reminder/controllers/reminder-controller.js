import ReminderService from '../../../../services/reminder-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';
import HttStatus from '../../../constants/http-status';

const get = async ctx => {
  try {
    if (ctx.params.id) {
      ctx.body = await ReminderService.getRemindersByUserId(ctx.params.id);
    } else {
      ctx.body = await ReminderService.getReminders();
    }
    
    logger.log(LoggerLevels.DEBUG, `Reminders sent: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const post = async ctx => {
  try {
    ctx.body = await ReminderService.createReminder(ctx.request.body);
    logger.log(LoggerLevels.DEBUG, 'New reminder created');
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const put = async ctx => {
  try {
    ctx.body = await ReminderService.updateReminder(ctx.params.id, ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Reminder with id:${ctx.params.id} updated to ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const remove = async ctx => {
  try {
    await ReminderService.removeReminder(ctx.params.id);
    ctx.body = HttStatus.OK;
    logger.log(LoggerLevels.DEBUG, 'Reminder was removed');
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { get, post, put, remove };
