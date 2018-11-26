import momentService from '../../services/moment-service';
import { STANDARD_DEVIATION_SECONDS } from '../../services/constants/moment';

const isTimeToSendNotification = (reminderTime, projectTime) => {
  const currentTimeInSeconds = momentService.getSecondsFromTime(momentService.getCurrentUTCDate());
  const reminderTimeInSeconds = momentService.getSecondsFromTime(reminderTime);

  return (
    reminderTimeInSeconds >= projectTime - currentTimeInSeconds - STANDARD_DEVIATION_SECONDS &&
    reminderTimeInSeconds <= projectTime - currentTimeInSeconds + STANDARD_DEVIATION_SECONDS
  );
};

export { isTimeToSendNotification };
