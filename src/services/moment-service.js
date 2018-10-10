import moment from 'moment';

const DATA_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'hh:mm:ss';

const convertDate = date => {
  return moment(date).format(DATA_FORMAT);
};

const convertTime = time => {
  return moment(time).format(TIME_FORMAT);
};

const getCurrentDate = () => {
  const date = new Date();

  return convertDate(`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`);
};

const getCurrentUTCTime = () => {
  const date = new Date();

  return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
};

export default { convertTime, convertDate, getCurrentUTCTime, getCurrentDate };
