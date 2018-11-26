import HttpStatus from 'http-status';
import UserService from '../../../../services/user-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const get = async ctx => {
  if (ctx.user.role === 'admin') {
    ctx.body = await UserService.getUsers();
    ctx.status = HttpStatus.OK;
    logger.log(LoggerLevels.DEBUG, `Users sent: ${JSON.stringify(ctx.body)}`);
  } else {
    ctx.status = HttpStatus.FORBIDDEN;
    throw new Error('Insufficient permissions to get all projects');
  }
};

const post = async ctx => {
  ctx.body = await UserService.createUser(ctx.request.body);
  ctx.status = HttpStatus.OK;
  logger.log(LoggerLevels.INFO, 'New user created successfully');
  logger.log(LoggerLevels.DEBUG, JSON.stringify(ctx.body));
};

const remove = async ctx => {
  await UserService.removeUserById(ctx.params.id);
  ctx.status = HttpStatus.NO_CONTENT;
  logger.log(LoggerLevels.DEBUG, `Deleted user on id=${ctx.params.id}`);
};

export default {
  get,
  post,
  remove,
};
