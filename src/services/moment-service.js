import {
  nativeJs,
  LocalDate,
  LocalTime,
  ZonedDateTime,
  ZoneId,
  DayOfWeek,
  ZoneOffset,
} from 'js-joda';
import {
  STANDARD_DEVIATION_SECONDS,
  DEFAULT_DATE,
  NOTIFICATION_PERIOD_HOURS,
} from './constants/moment';

const checkWeekend = () => {
  const day = LocalDate.now().dayOfWeek();

  return day === DayOfWeek.SATURDAY || day === DayOfWeek.SUNDAY;
};

const getUTCOffset = () => {
  return LocalTime.now()._hour - LocalTime.now(ZoneOffset.UTC)._hour;
};

const getCurrentTimeWithDeviation = () => {
  const currentTime = LocalTime.now();
  const defaultDate = LocalDate.parse(DEFAULT_DATE).atTime(
    currentTime._hour,
    currentTime._minute,
    currentTime._second,
    currentTime._nano
  );

  return {
    leftDeviation: new Date(defaultDate.minusSeconds(STANDARD_DEVIATION_SECONDS)),
    rightDeviation: new Date(defaultDate.plusSeconds(STANDARD_DEVIATION_SECONDS)),
  };
};

const getCurrentTimeWithNotificationPeriod = () => {
  const currentTime = LocalTime.now();
  const defaultDate = LocalDate.parse(DEFAULT_DATE).atTime(
    currentTime._hour,
    currentTime._minute,
    currentTime._second,
    currentTime._nano
  );

  return {
    currentTime: new Date(defaultDate),
    timeWithNotificationPeriod: new Date(defaultDate.plusHours(NOTIFICATION_PERIOD_HOURS)),
  };
};

const formatTime = time => {
  const formatTime = LocalTime.from(nativeJs(time));

  return LocalTime.of(formatTime._hour, formatTime._minute, formatTime._second);
};

const formatTimeFromUTC = time => {
  const formatTime = LocalTime.from(nativeJs(time)).minusHours(
    LocalTime.now()._hour - LocalTime.now(ZoneOffset.UTC)._hour
  );

  return LocalTime.of(formatTime._hour, formatTime._minute, formatTime._second);
};

const formatDate = date => {
  return LocalDate.from(nativeJs(date)).toString();
};

const convertTimeToUTC = time => {
  const convertTime = LocalTime.parse(time);

  return convertTime.minusHours(getUTCOffset()).toString();
};

const getCurrentUTCDate = () => {
  return {
    date: ZonedDateTime.now(ZoneId.UTC)._dateTime._date.toString(),
    time: LocalTime.now(ZoneOffset.UTC).toString(),
  };
};

const getYesterdayDate = () => {
  return LocalDate.now().minusDays(1).toString();
};

export default {
  formatTime,
  formatDate,
  formatTimeFromUTC,
  getCurrentUTCDate,
  getCurrentTimeWithNotificationPeriod,
  getCurrentTimeWithDeviation,
  checkWeekend,
  convertTimeToUTC,
  getYesterdayDate,
};
