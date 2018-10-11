import Router from 'koa-router';
import userController from './controllers/user-controller';

const router = new Router({
  prefix: '/users',
});

router
  .get('/', userController.get)
  .get('/projects',userController.getUsersByProjectId )
  .post('/', userController.post)
  .delete('/:id', userController.remove)
  .put('/', userController.put);

export default router.routes();
