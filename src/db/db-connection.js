import Sequelize from 'sequelize';
import databaseConfig from './constants/db-config';

const sequelize = new Sequelize(
  databaseConfig.DATABASE,
  databaseConfig.USERNAME,
  databaseConfig.PASSWORD,
  databaseConfig.PARAMS,
);

export default sequelize;
