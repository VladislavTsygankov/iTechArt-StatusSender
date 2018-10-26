import bcrypt from 'bcryptjs';
import { User, ProjectUser } from '../db/models';

const getUsers = async () => {
  return await User.findAll({ attributes: ['id', 'username', 'role'] });
};

const getUsersByProjectId = async id => {
  return await ProjectUser.findAll({
    where: { ProjectId: id },
    include: [{ model: User, attributes: ['username', 'id'] }],
  }).map(foundRelation => {
    return foundRelation.User;
  });
};

const getFreeUsersByProjectId = async id => {
  const assignedUsers = await ProjectUser.findAll({
    where: { ProjectId: id },
    include: [{ model: User, attributes: ['id'] }],
  }).map(foundRelation => {
    return foundRelation.User.id;
  });

  const freeUsers = await User.findAll({ attributes: ['role', 'id', 'username'] }).filter(user => {
    if (assignedUsers.every(assignedUser => assignedUser !== user.id)) {
      return user;
    }
  });

  return freeUsers;
};

const createUser = async userData => {
  const { username } = userData;

  let user = await User.findOne({ where: { username: username } });

  if (!user) {
    return await User.create({ ...userData });
  } else {
    throw new Error('User is already exist');
  }
};

const removeUserById = async id => {
  return await User.destroy({ where: { Id: id } });
};

const changePassword = async (id, password) => {
  password = bcrypt.hashSync(password);
  await User.update({ password }, { where: { Id: id } });

  return await User.findOne({ attributes: ['Id', 'username', 'role'], where: { Id: id } });
};

export default {
  getUsers,
  createUser,
  removeUserById,
  changePassword,
  getUsersByProjectId,
  getFreeUsersByProjectId,
};
