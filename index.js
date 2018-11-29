const LocalDate = require('js-joda').LocalDate;
const LocalTime = require('js-joda').LocalTime;
const LocalDateTime = require('js-joda').LocalDateTime;
const ZonedDateTime = require('js-joda').ZonedDateTime;
const nativeJs = require('js-joda').nativeJs;
const lodash = require('lodash');

const ZoneId = require('js-joda').ZoneId;

const ZoneOffset = require('js-joda').ZoneOffset;

const time1 = LocalTime.of(22, 55, 3);
const time2 = LocalTime.of(23, 55, 12);

console.log(time1, 'and', time2);

console.log(
  time1.toSecondOfDay() >= time2.toSecondOfDay() - 30 &&
    time1.toSecondOfDay() <= time2.toSecondOfDay() + 30
);

console.log(time1 - time2);

