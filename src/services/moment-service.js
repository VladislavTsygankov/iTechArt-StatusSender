import moment from 'moment';

const TIME_FORMAT = 'HH:mm:ss';

const convertDate = date => {
  return moment(date);
};

const convertTime = time => {
  return moment(time)
    .utc()
    .format(TIME_FORMAT);
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

const getCurrentDate = () => {
  return moment().utc();
};

const getCurrentUTCTime = () => {
  return moment()
    .utc()
    .format(TIME_FORMAT);
};

const checkWeekend = () => {
  return moment().day() === 0 || moment().day() === 6;
};

export default {
  convertTime,
  convertDate,
  getCurrentUTCTime,
  getCurrentDate,
  checkWeekend,
  convertTimeFromSecondsToUTC,
  convertTimeFromSeconds,
};
