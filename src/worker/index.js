import { getProjectsToSend, getNotificationsToSend } from './worker-service/check-time';
import { REQUEST_DELAY } from './constants/worker';
import ProjectService from '../services/project-service';
import ReminderService from '../services/reminder-service';
import momentService from '../services/moment-service';
import ProjectUserHelper from '../services/helpers/project-user-helper';

// setInterval(() => {
//   if (momentService.isMidnight()) {
//     ProjectService.resetStatusOfProjects();
//   }

//   getProjectsToSend();

//   getNotificationsToSend();
// }, REQUEST_DELAY);

// ProjectService.getNotifiableProjects().then(results => {
//   console.log(results.length);
//   console.log(results.map(result => ({
//     name: result.name,
//     time: momentService.convertTimeFromSeconds(result.timeForSend)
//   })));

// });
