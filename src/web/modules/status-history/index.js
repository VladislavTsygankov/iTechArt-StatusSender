import Router from 'koa-router';
import StatusController from './controllers/status-controller';

const router = new Router({ prefix: '/statushistory' });

router
  .post('/', StatusController.post)
  .get('/', StatusController.get);

export default router.routes();
