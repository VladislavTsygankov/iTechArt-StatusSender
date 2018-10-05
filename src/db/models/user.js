import db from '../db-connection';

const User = db.define(
  'User',
  {
    username: {
      type: db.Sequelize.STRING,
    },
    password: {
      type: db.Sequelize.STRING,
    },
    role: {
      type: db.Sequelize.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export default User;
