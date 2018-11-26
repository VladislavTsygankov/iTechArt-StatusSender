import { User } from '../db/models';
import createIfNotExist from './helpers/create-if-not-exist';

const getUsers = async () => {
  return await User.findAll({ attributes: ['id', 'username', 'role'] });
};

const createUser = async userData => {
  return await createIfNotExist(User, { username: userData.username }, { ...userData });
};

const removeUserById = async id => {
  return await User.destroy({ where: { Id: id } });
};

export default {
  getUsers,
  createUser,
  removeUserById,
};
