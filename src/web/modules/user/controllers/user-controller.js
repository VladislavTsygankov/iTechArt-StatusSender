import HttpStatus from 'http-status';
import UserService from '../../../../services/user-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const get = async ctx => {
  try {
    if (ctx.user.role === 'admin') {
      ctx.body = await UserService.getUsers();
      ctx.status = HttpStatus.OK;
      logger.log(LoggerLevels.DEBUG, `Users sent: ${JSON.stringify(ctx.body)}`);
    } else {
      ctx.status = HttpStatus.FORBIDDEN;
      throw new Error('Insufficient permissions to get all projects');
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, err);
  }
};

const getUsersByProjectId = async ctx => {
  try {
    ctx.body = await UserService.getUsersByProjectId(ctx.params.projectId);
    ctx.status = HttpStatus.OK;
    logger.log(LoggerLevels.DEBUG, `Users sent: ${JSON.stringify(ctx.body)}`);
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, err);
  }
};

const getFreeUsersByProjectId = async ctx => {
  try {
    ctx.body = await UserService.getFreeUsersByProjectId(ctx.params.projectId);
    ctx.status = HttpStatus.OK;
    logger.log(LoggerLevels.DEBUG, `Users sent: ${JSON.stringify(ctx.body)}`);
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, err);
  }
};

const post = async ctx => {
  try {
    ctx.body = await UserService.createUser(ctx.request.body);
    ctx.status = HttpStatus.OK;
    logger.log(LoggerLevels.INFO, 'New user created successfully');
    logger.log(LoggerLevels.DEBUG, JSON.stringify(ctx.body));
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const remove = async ctx => {
  try {
    await UserService.removeUserById(ctx.params.id);
    ctx.status = HttpStatus.NO_CONTENT;
    logger.log(LoggerLevels.DEBUG, `Deleted user on id=${ctx.params.id}`);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const put = async ctx => {
  try {
    ctx.body = await UserService.changePassword(ctx.user.id, ctx.request.body.password);
    ctx.status = HttpStatus.ACCEPTED;
    logger.log(LoggerLevels.DEBUG, `User with id:${ctx.params.id} updated to ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default {
  get,
  post,
  remove,
  put,
  getUsersByProjectId,
  getFreeUsersByProjectId,
};
