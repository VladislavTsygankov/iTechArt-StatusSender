import Router from 'koa-router';
import ProjectUserController from './controllers/project-user';

const router = new Router({ prefix: '/projectuser' });

router
  .post('/', ProjectUserController.post)
  .get('?:userId', ProjectUserController.get);

export default router.routes();
