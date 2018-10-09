import { User } from '../db/models';

const getUsers = async id => {
  if (id) {
    return await User.findById(id, { attributes: ['Id', 'username', 'role'] });
  }

  return await User.findAll({ attributes: ['Id', 'username', 'role'] });
};

const createUser = async userData => {
  const { username } = userData;

  let user = await User.findOne({ where: { username: username } });

  if (!user) {
    user = new User({ ...userData });

    return await user.save();
  } else {
    throw new Error('User is already exist');
  }
};

const removeUserById = async id => {
  const user = await User.findById(id);

  if (user) {
    return await User.destroy({ where: { Id: id } });
  } else {
    throw new Error('This user is not available');
  }
};

const updateUserById = async (id, userData) => {
  await User.update(userData, { where: { Id: id } });

  return await User.findOne({ attributes: ['Id', 'username', 'role'], where: { Id: id } });
};

export default { getUsers, createUser, removeUserById, updateUserById };
