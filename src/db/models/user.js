import bcrypt from 'bcryptjs';
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
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.dataValues.password = bcrypt.hashSync(user.password, salt);
      },
    },
    createdAt: false,
    updatedAt: false,
  },
);

export default User;
