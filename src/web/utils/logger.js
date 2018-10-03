import winston from 'winston';
import LoggerLevel from '../constants/logger-levels';
import config from '../config';

const { combine, timestamp, printf, colorize } = winston.format;

const loggerFormat = printf(info => {
  return `${info.timestamp} - ${info.level}: ${info.message}`;
});

export default winston.createLogger({
  level: config.MODE === 'production' ? LoggerLevel.WARN : LoggerLevel.DEBUG,
  format: combine(colorize(), timestamp(), loggerFormat),
  transports: [new winston.transports.Console()],
});
