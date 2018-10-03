import Router from 'koa-router';
import ProjectController from './controllers/project-controller';

const router = new Router({ prefix: '/projects' });

router
  .get('/', ProjectController.get)
  .post('/', ProjectController.post)
  .get('/:id', ProjectController.get)
  .put('/:id', ProjectController.put)
  .delete('/:id', ProjectController.remove);

export default router.routes();
