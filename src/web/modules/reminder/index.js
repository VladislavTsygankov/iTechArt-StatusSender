import Router from 'koa-router';
import ReminderController from './controllers/reminder-controller';
import { findReminder } from './handlers/reminder-handler';

const router = new Router({ prefix: '/reminders' });

router
  .get('/', ReminderController.get)
  .post('/', ReminderController.post)
  .param('id', findReminder)
  .put('/:id', ReminderController.put)
  .delete('/:id', ReminderController.remove)
  .get('/:id', ReminderController.get);

export default router.routes();
