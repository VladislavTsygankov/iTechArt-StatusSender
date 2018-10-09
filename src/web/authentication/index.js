import Router from 'koa-router';
import AuthController from './controllers/auth-controller';

const router = new Router({ prefix: '/auth' });

router.post('/signin', AuthController.signIn);

export default router.routes();
