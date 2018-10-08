import Router from 'koa-router';
import passport from 'koa-passport';
import ProjectController from './controllers/project-controller';

const router = new Router({ prefix: '/projects' });

router
  .get('/', passport.authenticate('bearer', { session: false }), ProjectController.get)
  .post('/', passport.authenticate('bearer', { session: false }), ProjectController.post)
  .get('/:id', passport.authenticate('bearer', { session: false }), ProjectController.get)
  .put('/:id', passport.authenticate('bearer', { session: false }), ProjectController.put)
  .delete('/:id', passport.authenticate('bearer', { session: false }), ProjectController.remove);

export default router.routes();
