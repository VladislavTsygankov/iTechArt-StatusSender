import Router from 'koa-router';
import StatusController from './controllers/status-controller';

const router = new Router({ prefix: '/statushistory' });

router
  .post('/', StatusController.post)
  .get('/:pageId', StatusController.get)
  .get('/user_status/:projectId', StatusController.getCurrentStatus);

export default router.routes();
