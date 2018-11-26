import Router from 'koa-router';
import userController from './controllers/user-controller';

const router = new Router({
  prefix: '/users',
});

router
  .get('/', userController.get)
  .post('/', userController.post)
  .delete('/:id', userController.remove);

export default router.routes();
