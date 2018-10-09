import Router from 'koa-router';
import passport from 'koa-passport';
import user from './user';
import project from './project';
import reminder from './reminder';
import project_user from './project-user';
import status_history from './status-history';
import authenticate from './authentication';

const router = new Router({ prefix: '/api' });

router.use(passport.authenticate('bearer', { session: false }));

router.use(user);
router.use(project);
router.use(reminder);
router.use(project_user);
router.use(status_history);
router.use(authenticate);

export default router.routes();
