import Router from 'koa-router';
import user from './user';
import project from './project';
import reminder from './reminder';

const router = new Router({ prefix: '/api' });

router.use(user);
router.use(project);
router.use(reminder);

export default router.routes();
