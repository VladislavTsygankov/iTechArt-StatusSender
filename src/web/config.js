import path from 'path';

const env = {
  PORT: 3001,
  MODE: 'development',
  whitelist: ['http://localhost:8080'],
  jwt: {
    secret: 'secret-row',
  },
};

const VIEW_PATH = path.resolve('.') + '/src/web/views';

export default {
  env,
  VIEW_PATH,
};
