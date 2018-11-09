import HttpStatus from 'http-status';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';
import ProjectService from '../../../../services/project-service';

const get = async ctx => {
  if (ctx.user.role === 'admin') {
    ctx.body = await ProjectService.getProjects();
    ctx.status = HttpStatus.OK;
    logger.log(LoggerLevels.DEBUG, `Project sent: ${JSON.stringify(ctx.body)}`);
  } else {
    ctx.status = HttpStatus.FORBIDDEN;
    throw new Error('Insufficient permissions to get all projects');
  }
};

const getUsersProjects = async ctx => {
  ctx.body = await ProjectService.getProjectsByUserId(ctx.user.id);
  ctx.status = HttpStatus.OK;
  logger.log(LoggerLevels.DEBUG, `Project sent: ${JSON.stringify(ctx.body)}`);
};

const post = async ctx => {
  if (ctx.user.role === 'admin') {
    ctx.body = await ProjectService.createProject(ctx.request.body);
    ctx.status = HttpStatus.CREATED;
    logger.log(LoggerLevels.DEBUG, `Project ${ctx.body.name} created`);
  } else {
    ctx.status = HttpStatus.FORBIDDEN;
    throw new Error('Insufficient permissions to create project');
  }
};

const remove = async ctx => {
  await ProjectService.removeProjectById(ctx.params.id);
  ctx.status = HttpStatus.NO_CONTENT;
  logger.log(
    LoggerLevels.DEBUG,
    `Project on id: ${ctx.params.id} - was removed `
  );
};

const put = async ctx => {
  ctx.body = await ProjectService.updateProjectById(
    ctx.params.id,
    ctx.request.body
  );
  ctx.status = HttpStatus.ACCEPTED;
  logger.log(
    LoggerLevels.DEBUG,
    `Project ${ctx.body.name} was updated to ${JSON.stringify(ctx.body)}`
  );
};

export default { get, post, put, remove, getUsersProjects };
