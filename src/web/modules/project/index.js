import Router from 'koa-router';
import ProjectController from './controllers/project-controller';
import { findProject } from './handler/project-handler';

const router = new Router({ prefix: '/projects' });

router
  .get('/', ProjectController.get)
  .post('/', ProjectController.post)
  .param('id', findProject)
  .get('/:id', ProjectController.get)
  .put('/:id', ProjectController.put)
  .delete('/:id', ProjectController.remove);

export default router.routes();
