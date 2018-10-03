import User from '../../../../db/models/user';
import UserService from '../../../../services/user-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';
import HttpStatus from '../../../constants/http-status';

const get = async ctx => {
  try {
    if (ctx.user) {
      ctx.body = ctx.user;
      return;
    }

    ctx.body = await User.findAll();
    logger.log(LoggerLevels.DEBUG, `Users sent: ${JSON.stringify(ctx.body)}`);
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    logger.log(LoggerLevels.ERROR, err);
  }
};

const post = async ctx => {
  try {
    ctx.body = await UserService.createUser(ctx.request.body);
    logger.log(LoggerLevels.INFO, 'New user created successfully');
    logger.log(LoggerLevels.DEBUG, JSON.stringify(ctx.body));
  } catch (error) {
    ctx.status = 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const remove = async ctx => {
  try {
    await UserService.removeUserById(ctx.params.id);
    ctx.body = HttpStatus.OK;
    logger.log(LoggerLevels.DEBUG, `Deleted user on id=${ctx.params.id}`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

const put = async ctx => {
  try {
    ctx.body = await UserService.updateUserById(ctx.params.id, ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Updated user on id=${ctx.params.id} to ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { get, post, remove, put };
