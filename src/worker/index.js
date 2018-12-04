import {
  getProjectsToSend,
  getNotificationsToSend,
  sendMissedProjects,
} from './worker-service/check-time';
import { REQUEST_DELAY } from './constants/worker';

setInterval(() => {
  getProjectsToSend();

  getNotificationsToSend();
}, REQUEST_DELAY);

sendMissedProjects();
