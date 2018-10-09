import AuthenticationService from '../../../services/auth-service';
import logger from '../../utils/logger';
import LoggerLevels from '../../constants/logger-levels';

const signIn = async ctx => {
  try {
    ctx.body = await AuthenticationService.signIn(ctx.request.body);
    logger.log(LoggerLevels.DEBUG, `Token: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = 500;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { signIn };
