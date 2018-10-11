import moment from 'moment';

const TIME_FORMAT = 'hh:mm:ss';

const convertDate = date => {
  return moment(date);
};

const convertTime = time => {
  return moment(time).format(TIME_FORMAT);
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

export default { convertTime, convertDate, getCurrentUTCTime, getCurrentDate, checkWeekend };
