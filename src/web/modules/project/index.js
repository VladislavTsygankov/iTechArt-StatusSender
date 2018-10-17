import Router from 'koa-router';
import ProjectController from './controllers/project-controller';

const router = new Router({ prefix: '/projects' });

router
  .get('/all', ProjectController.get)
  .get('/my', ProjectController.getUsersProjects)
  .post('/', ProjectController.post)
  .put('/:id', ProjectController.put)
  .delete('/:id', ProjectController.remove);

export default router.routes();
