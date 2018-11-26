import moment from 'moment';
import {
  MAX_TIME,
  STANDARD_DEVIATION_SECONDS,
  DEFAULT_DATE,
  NOTIFICATION_PERIOD_HOURS,
  TIME_FORMAT,
} from './constants/moment';
import { ZonedDateTime } from 'js-joda';

const isMidnight = () => {
  const currentTime = getSecondsFromTime(moment().utc());
  const maxTimeInSeconds = getSecondsFromTime(MAX_TIME);

  return (
    currentTime > maxTimeInSeconds - STANDARD_DEVIATION_SECONDS &&
    currentTime < maxTimeInSeconds + STANDARD_DEVIATION_SECONDS
  );
};

const checkWeekend = () => {
  return moment().day() === 0 || moment().day() === 6;
};

const getCurrentTimeWithDeviation = () => {
  const currentTimeInSeconds = getSecondsFromTime(new Date());

  return {
    leftDeviation: convertTimeFromSecondsToUTC(currentTimeInSeconds - STANDARD_DEVIATION_SECONDS),
    rightDeviation: convertTimeFromSecondsToUTC(currentTimeInSeconds + STANDARD_DEVIATION_SECONDS),
  };
};

const getCurrentTimeWithNotificationPeriod = () => {
  return {
    currentTime: moment(DEFAULT_DATE)
      .set({
        hour: moment().get('hour') - moment().utcOffset() / 60,
        minute: moment().get('minute'),
      })
      .format(),
    timeWithNotificationPeriod: moment(DEFAULT_DATE)
      .set({
        hour: moment().get('hour') - moment().utcOffset() / 60 + NOTIFICATION_PERIOD_HOURS,
        minute: moment().get('minute'),
      })
      .format(),
  };
};

const formatTime = time => {
  console.log(ZonedDateTime.parse(time));
  
  return moment(time)
    .utc()
    .format(TIME_FORMAT);
};

const getCurrentUTCDate = () => {
  const currentUTCDate = moment().utc();

  return {
    date: currentUTCDate,
    time: currentUTCDate.format(TIME_FORMAT),
  };
};

const convertTimeFromSecondsToUTC = seconds => {
  return moment()
    .startOf('day')
    .seconds(seconds)
    .utc()
    .format(TIME_FORMAT);
};

const convertTimeFromSeconds = seconds => {
  return moment()
    .startOf('day')
    .seconds(seconds)
    .format(TIME_FORMAT);
};

const getSecondsFromTime = time => {
  return moment.duration(moment(time).format(TIME_FORMAT)).asSeconds();
};

export default {
  formatTime,
  getCurrentUTCDate,
  convertTimeFromSecondsToUTC,
  convertTimeFromSeconds,
  getSecondsFromTime,
  getCurrentTimeWithNotificationPeriod,
  getCurrentTimeWithDeviation,
  isMidnight,
  checkWeekend,
};
