import Router from 'koa-router';
import user from './user';
import project from './project';

const router = new Router({ prefix: '/api' });

router.use(user);
router.use(project);

export default router.routes();
