import Router from 'koa-router';
import ProjectController from './controllers/project-controller';

const router = new Router({ prefix: '/projects' });

router
  .get('/', ProjectController.get)
  .get('/user', ProjectController.getProjectsByUserId)
  .post('/', ProjectController.post)
  .put('/:id', ProjectController.put)
  .delete('/:id', ProjectController.remove);

export default router.routes();
