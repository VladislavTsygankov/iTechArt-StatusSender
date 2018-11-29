import { getProjectsToSend, getNotificationsToSend } from './worker-service/check-time';
import { REQUEST_DELAY } from './constants/worker';
import { parentPort } from 'worker_threads';


setInterval(() => {
  getProjectsToSend();
  // parentPort.postMessage({message: 'work'})
//   getNotificationsToSend();
}, REQUEST_DELAY);

