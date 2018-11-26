const config = {
  DATABASE: 'StatusSenderDatabase',
  USERNAME: 'SS-server',
  PASSWORD: 'server',
  PARAMS: {
    dialect: 'mssql',
    dialectOptions: {
      encrypt: true,
    },
  },
};

export default config;
