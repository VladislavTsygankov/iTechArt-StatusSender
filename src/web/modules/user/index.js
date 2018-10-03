import Router from 'koa-router';
import userController from './controllers/user-controller';
import { findUser } from './handlers/user-handler';

const router = new Router({
  prefix: '/users',
});

router
  .get('/', userController.get)
  .post('/', userController.post)
  .param('id', findUser)
  .delete('/:id', userController.remove)
  .put('/:id', userController.put)
  .get('/:id', userController.get);

export default router.routes();
