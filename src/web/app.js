import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import error from 'koa-error';
import views from 'koa-views';
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
app.use(apiRouters);

app.use(
  error({
    engine: 'pug',
    template: config.VIEW_PATH + 'error.pug',
  }),
);
app.use(views(config.VIEW_PATH));

app.use(async ctx => {
  await ctx.render('index.pug');
});

app.on('error', err => {
  logger.log(LoggerLevels.ERROR, err);
});

export default app;
