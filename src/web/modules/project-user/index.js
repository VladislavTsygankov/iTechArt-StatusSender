import Router from 'koa-router';
import ProjectUserController from './controllers/project-user';

const router = new Router({ prefix: '/projectuser' });

router
  .post('/', ProjectUserController.post)
  .get('/:flag/:id', ProjectUserController.get);

export default router.routes();
