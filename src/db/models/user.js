import Sequelize from 'sequelize';
import db from '../db-connection';

const User = db.define(
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
