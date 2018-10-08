import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import error from 'koa-error';
import views from 'koa-views';
import passport from 'koa-passport';
import config from './config';
import logger from './utils/logger';
import LoggerLevels from './constants/logger-levels';
import routers from './modules';
import './modules/authentication/strategy/bearer-strategy';

const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(routers);

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
