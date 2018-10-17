import HttpStatus from 'http-status';
import AuthenticationService from '../../../services/auth-service';
import logger from '../../utils/logger';
import LoggerLevels from '../../constants/logger-levels';

const signIn = async ctx => {
  try {
    ctx.body = await AuthenticationService.signIn(ctx.request.body);
    ctx.status = HttpStatus.OK;
    logger.log(LoggerLevels.DEBUG, `Token: ${JSON.stringify(ctx.body)}`);
  } catch (error) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.log(LoggerLevels.ERROR, error);
  }
};

export default { signIn };
