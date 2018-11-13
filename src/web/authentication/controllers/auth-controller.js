import HttpStatus from 'http-status';
import AuthenticationService from '../../../services/auth-service';
import logger from '../../utils/logger';
import LoggerLevels from '../../constants/logger-levels';

const signIn = async ctx => {
  ctx.body = await AuthenticationService.signIn(ctx.request.body);
  ctx.status = HttpStatus.OK;
  logger.log(LoggerLevels.DEBUG, `Token: ${JSON.stringify(ctx.body)}`);
};

export default { signIn };
