import HttpStatus from 'http-status';
import StatusService from '../../../../services/status-history-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const post = async ctx => {
  try {
    ctx.body = await StatusService.createStatus(ctx.request.body);
    ctx.status = HttpStatus.CREATED;
    logger.log(LoggerLevels.DEBUG, `Status was created seccesfully ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const get = async ctx => {
  try {
    if (ctx.user.role === 'admin') {
      ctx.body = await StatusService.getHistory();
    } else {
      ctx.body = await StatusService.getHistoryByUserId(ctx.user.id);
    }

    ctx.status = HttpStatus.OK;
    logger.log(LoggerLevels.DEBUG, `Hostory sent: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { post, get };
