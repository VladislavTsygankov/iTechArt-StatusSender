import passport from 'koa-passport';
import BearerStrategy from 'passport-http-bearer';
import jwtService from '../../../../services/jwt-service';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';
import { User } from '../../../../db/models';

passport.use(
  new BearerStrategy((token, done) => {
    logger.log(LoggerLevels.DEBUG, token);
    User.findOne({ where: { username: jwtService.verify(token) } })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: 'all' });
      })
      .catch(err => {
        return done(err);
      });
  }),
);
