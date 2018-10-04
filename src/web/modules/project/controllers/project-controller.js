import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';
import ProjectService from '../../../../services/project-service';

const get = async ctx => {
  try {
    ctx.body = await ProjectService.getProject(ctx.params.id);
    logger.log(LoggerLevels.DEBUG, `Project sent: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const post = async ctx => {
  try {
    ctx.body = await ProjectService.createProject(ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Project ${ctx.body.name} created`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const remove = async ctx => {
  try {
    await ProjectService.removeProjectById(ctx.params.id);
    logger.log(LoggerLevels.DEBUG, `Projecet ${ctx.project.name} was removed `);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const put = async ctx => {
  try {
    ctx.body = await ProjectService.updateProjectById(ctx.params.id, ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Project ${ctx.project.name} was updated to ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { get, post, put, remove };
