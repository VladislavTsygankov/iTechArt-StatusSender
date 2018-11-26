import lodash from 'lodash';
import { ProjectUser } from '../../db/models';

const createRelations = async (userIds, projectId) => {
  const relations = userIds.map(userId => {
    return {
      UserId: userId,
      ProjectId: projectId,
    };
  });

  return await ProjectUser.bulkCreate(relations);
};

const removeRelations = async (userIds, projectId) => {
  return await ProjectUser.destroy({
    where: { ProjectId: projectId, UserId: userIds },
  });
};

const compareAndUpdateRelations = async (projectId, membersList) => {
  const currentProjectRelations = await ProjectUser.findAll({
    where: { ProjectId: projectId },
    attributes: ['UserId'],
  }).map(relation => {
    return relation.UserId;
  });

  removeRelations(
    lodash.without(currentProjectRelations, ...membersList),
    projectId
  );

  createRelations(
    lodash.without(membersList, ...currentProjectRelations),
    projectId
  );
};

export default { createRelations, removeRelations, compareAndUpdateRelations };
