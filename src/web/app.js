import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import config from './config';
import logger from './utils/logger';
import LoggerLevels from './constants/logger-levels';
import apiRouters from './modules';
import authRouters from './authentication';
import checkOrigin from './helpers/check-origin';
import './authentication/strategy/bearer-strategy';

const app = new Koa();

app.keys = [config.env.jwt.secret];

app.use(cors({origin: checkOrigin}));
app.use(bodyParser());

app.use(authRouters);
app.use(apiRouters.routes());
app.use(apiRouters.allowedMethods());

app.on('error', err => {
  logger.log(LoggerLevels.ERROR, err);
});

export default app;
