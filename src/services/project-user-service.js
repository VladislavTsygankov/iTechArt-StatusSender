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

const compareArrays = (arr1, arr2) => {
  return arr1.filter(i => arr2.indexOf(i) < 0).concat(arr2.filter(i => arr1.indexOf(i) < 0));
};

const compareAndUpdateRelations = async (projectId, membersList) => {
  const currentProjectRelations = await ProjectUser.findAll({
    where: { ProjectId: projectId },
    attributes: ['UserId'],
  }).map(relation => {
    return relation.UserId;
  });

  if (currentProjectRelations.length < membersList.length) {
    membersList = compareArrays(membersList, currentProjectRelations);

    membersList.forEach(member => {
      createRelation(member, projectId);
    });
  } else if (currentProjectRelations.length > membersList.length) {
    membersList = compareArrays(membersList, currentProjectRelations);

    membersList.forEach(member => {
      removeRelation(member, projectId);
    });
  }
};

export default { createRelation, removeRelation, compareAndUpdateRelations };
