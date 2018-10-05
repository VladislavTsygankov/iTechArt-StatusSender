import ProjectUserService from '../../../../services/project-user-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const post = async ctx => {
  try {
    ctx.body = await ProjectUserService.createRelation(ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Relation created ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const get = async ctx => {
  try {    
    logger.log(LoggerLevels.DEBUG, `relations sent: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.status || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { post, get };
