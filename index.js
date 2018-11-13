const moment = require('moment');

console.log(
  moment
    .duration('1970-01-01T21:00:00.000Z')
    .asMinutes()
);
