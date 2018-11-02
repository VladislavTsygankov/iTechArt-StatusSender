import lodash from 'lodash';
import { ProjectUser } from '../db/models';

const createRelation = async (userId, projectId) => {
  let relation = await ProjectUser.findOne({ where: { UserId: userId, ProjectId: projectId } });

  if (!relation) {
    await ProjectUser.create({ UserId: userId, ProjectId: projectId });
  }
};

const removeRelation = async (userId, projectId) => {
  return await ProjectUser.destroy({ where: { ProjectId: projectId, UserId: userId } });
};


const compareAndUpdateRelations = async (projectId, membersList) => {
  const currentProjectRelations = await ProjectUser.findAll({
    where: { ProjectId: projectId },
    attributes: ['UserId'],
  }).map(relation => {
    return relation.UserId;
  });

  lodash.without(currentProjectRelations, ...membersList).forEach(member => removeRelation(member, projectId));
  lodash.without(membersList, ...currentProjectRelations).forEach(member => createRelation(member, projectId));
};

export default { createRelation, removeRelation, compareAndUpdateRelations };
