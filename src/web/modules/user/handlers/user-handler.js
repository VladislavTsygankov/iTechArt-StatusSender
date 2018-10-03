import User from '../../../../db/models/user';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const findUser = async (id, ctx, next) => {
  ctx.user = await User.findById(id);
  logger.log(LoggerLevels.DEBUG, `Found user: ${JSON.stringify(ctx.user)}`);

  return next();
};

export { findUser };
