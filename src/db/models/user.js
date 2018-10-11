import bcrypt from 'bcryptjs';
import db from '../db-connection';

const User = db.define(
  'User',
  {
    username: {
      type: db.Sequelize.STRING(50),
    },
    password: {
      type: db.Sequelize.STRING(100),
    },
    role: {
      type: db.Sequelize.STRING(50),
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
