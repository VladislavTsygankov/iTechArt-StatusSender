import Sequelize from 'sequelize';
import sequelize from '../db-connection';

const User = sequelize.define(
  'Users',
  {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export default User;
