import { User, Project, ProjectUser } from '../db/models';

const getUsersByProjectId = async id => {
  return await ProjectUser.findAll({ where: { ProjectId: id }, include: [{ model: User }] }).map(foundedRelation => {
    return foundedRelation.User;
  });
};

const getProjectsByUserId = async id => {
  return await ProjectUser.findAll({ where: { UserId: id }, include: [{ model: Project }] }).map(foundedRelation => {
    return foundedRelation.Project;
  });
};

const createRelation = async relationData => {
  let relation = await ProjectUser.findOne({ where: relationData });

  if (!relation) {
    relation = new ProjectUser({ ...relationData });

    return await relation.save();
  } else {
    throw new Error('Relation is already exist');
  }
};

export default { createRelation, getUsersByProjectId, getProjectsByUserId };
