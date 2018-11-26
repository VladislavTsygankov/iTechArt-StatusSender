import http from 'http';
import app from './app';
import path from 'path';
import config from './config';
import logger from './utils/logger';
import LoggerLevels from './constants/logger-levels';
import db from '../db/db-connection';
import worker from '../worker/worker-service/start-worker';

db.authenticate()
  .then(() => {
    logger.log(LoggerLevels.INFO, 'Connected to Status Sender database');
    http.createServer(app.callback()).listen(config.env.PORT);
    logger.log(
      LoggerLevels.INFO,
      `Server is running on port ${config.env.PORT}\n`
    );
    worker(path.join(__dirname, '../worker/index.js'), err => {
      if (err) {
        throw new Error('Worker was failed');
      }
    });
  })
  .catch(err => {
    logger.log(LoggerLevels.ERROR, `Connected is failed : ${err} `);
  });
