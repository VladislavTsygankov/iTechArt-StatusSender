import { User } from '../db/models';

const getUsers = async id => {
  if (id) {
    return await User.findById(id);
  }

  return await User.findAll();
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
  return await User.destroy({
    where: {
      Id: id,
    },
  });
};

const updateUserById = async (id, userData) => {
  await User.update(userData, {
    where: {
      Id: id,
    },
  });

  return await User.findById(id);
};

export default { getUsers, createUser, removeUserById, updateUserById };
