import Router from 'koa-router';
import passport from 'koa-passport';
import user from './user';
import project from './project';
import reminder from './reminder';
import status_history from './status-history';
import authenticate from './authentication';
import findUser from '../handlers/find-user';

const router = new Router({ prefix: '/api' });

router.use(passport.authenticate('bearer', { session: false }));
router.use(findUser);
router.allowedMethods();

router.use(user);
router.use(project);
router.use(reminder);
router.use(status_history);
router.use(authenticate);

export default router;
