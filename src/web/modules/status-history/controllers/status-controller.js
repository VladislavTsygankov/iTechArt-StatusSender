import StatusService from '../../../../services/status-history-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const post = async ctx => {
  try {
    ctx.body = await StatusService.createStatus(ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Status was created seccesfully ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const get = async ctx => {
  try {
    if (ctx.params.uid) {
      ctx.body = await StatusService.getHistoryByUserId(ctx.params.uid);
    } else {
      ctx.body = await StatusService.getHistory();
    }

    logger.log(LoggerLevels.DEBUG, `Hostory sent: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { post, get };
