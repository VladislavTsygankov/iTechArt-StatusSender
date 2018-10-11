import Router from 'koa-router';
import ReminderController from './controllers/reminder-controller';

const router = new Router({ prefix: '/reminders' });

router
  .get('/', ReminderController.get)
  .post('/', ReminderController.post)
  .put('/:id', ReminderController.put)
  .delete('/:id', ReminderController.remove);

export default router.routes();
