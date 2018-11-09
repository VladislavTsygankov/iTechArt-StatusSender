import http from 'http';
import app from './app';
import config from './config';
import logger from './utils/logger';
import LoggerLevels from './constants/logger-levels';
import db from '../db/db-connection';

db.authenticate()
  .then(() => {
    logger.log(LoggerLevels.INFO, 'Connected to Status Sender database');
    http.createServer(app.callback()).listen(config.env.PORT);
    logger.log(
      LoggerLevels.INFO,
      `Server is running on port ${config.env.PORT}\n`
    );
  })
  .catch(err => {
    logger.log(LoggerLevels.ERROR, `Connected is failed : ${err} `);
  });
