import Router from 'koa-router';
import user from './user';
import project from './project';
import reminder from './reminder';
import project_user from './project-user';
import status_history from './status-history';

const router = new Router({ prefix: '/api' });

router.use(user);
router.use(project);
router.use(reminder);
router.use(project_user);
router.use(status_history);

export default router.routes();
