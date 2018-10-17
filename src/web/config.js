const env = {
  PORT: 3001,
  MODE: 'development',
  clientDomainsWhitelist: ['http://localhost:8080'],
  jwt: {
    secret: 'secret-row',
  },
};

export default {
  env,
};
