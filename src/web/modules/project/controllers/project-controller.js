import HttpStatus from 'http-status';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';
import ProjectService from '../../../../services/project-service';

const get = async ctx => {
  try {
    if (ctx.user.role === 'admin') {
      ctx.body = await ProjectService.getProjects();
      logger.log(LoggerLevels.DEBUG, `Project sent: ${JSON.stringify(ctx.body)}`);
    } else {
      ctx.status = HttpStatus.FORBIDDEN;
      throw new Error('Insufficient permissions to get all projects');
    }
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const getProjectsByUserId = async ctx => {
  try {
    ctx.body = await ProjectService.getProjectsByUserId(ctx.user.id);
    logger.log(LoggerLevels.DEBUG, `Project sent: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const post = async ctx => {
  try {
    if (ctx.user.id === 'admin') {
      ctx.body = await ProjectService.createProject(ctx.request.body);
      logger.log(LoggerLevels.DEBUG, `Project ${ctx.body.name} created`);
    } else {
      ctx.status = HttpStatus.FORBIDDEN;

      throw new Error('Insufficient permissions to get all projects');
    }
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const remove = async ctx => {
  try {
    await ProjectService.removeProjectById(ctx.params.id);
    logger.log(LoggerLevels.DEBUG, `Projecet ${ctx.project.name} was removed `);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const put = async ctx => {
  try {
    ctx.body = await ProjectService.updateProjectById(ctx.params.id, ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Project ${ctx.body.name} was updated to ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { get, post, put, remove, getProjectsByUserId };
