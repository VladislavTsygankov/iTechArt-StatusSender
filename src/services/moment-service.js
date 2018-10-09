import moment from 'moment';

const DATA_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'hh:mm:ss a';

const convertDate = date => {
  return moment(date).format(DATA_FORMAT);
};

const convertTime = time => {
  return moment(time).format(TIME_FORMAT);
};

const getCurrentDate = () => {
  const date = new Date();

  return convertDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
};

const getCurrentUTCTime = () => {
  const date = new Date();

  return convertTime(`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`);
};

export default { convertTime, convertDate, getCurrentUTCTime, getCurrentDate };
