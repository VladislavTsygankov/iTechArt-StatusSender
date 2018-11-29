import { LocalTime } from 'js-joda';
import momentService from '../../services/moment-service';
import { STANDARD_DEVIATION_SECONDS } from '../../services/constants/moment';

const isTimeToSendNotification = (reminderTime, projectTime) => {
  const projectTimeInSeconds = projectTime.toSecondOfDay();
  const currentTimeInSeconds = LocalTime.now().toSecondOfDay();
  const reminderTimeInSeconds = momentService.formatTimeFromUTC(reminderTime).toSecondOfDay();

  return (
    reminderTimeInSeconds >=
      projectTimeInSeconds - currentTimeInSeconds - STANDARD_DEVIATION_SECONDS &&
    reminderTimeInSeconds <=
      projectTimeInSeconds - currentTimeInSeconds + STANDARD_DEVIATION_SECONDS
  );
};

export { isTimeToSendNotification };
