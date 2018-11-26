import lodash from 'lodash';
import momentService from './moment-service';
import RelationHelper from './helpers/project-user-helper';
import { Project, ProjectUser, User, Reminder, StatusHistory } from '../db/models';
import createIfNotExist from './helpers/create-if-not-exist';

const getProjects = async () => {
  return await Project.findAll({
    include: [
      {
        model: ProjectUser,
        include: [{ model: User, attributes: ['id', 'username', 'role'] }],
      },
    ],
  }).map(project => ({
    ...lodash.pick(project, [
      'id',
      'name',
      'greeting',
      'signature',
      'timeForSend',
      'addressees',
      'copyAddressees',
    ]),
    assignedUsers:
      project.ProjectUsers.length > 0
        ? project.ProjectUsers.map(relation => relation.User.dataValues)
        : [],
  }));
};

const getProjectsByUserId = async id => {
  return await ProjectUser.findAll({
    where: { UserId: id },
    include: [
      {
        model: Project,
        attributes: ['name', 'id'],
      },
    ],
  }).map(foundRelation => {
    return foundRelation.Project;
  });
};

const removeProjectById = async id => {
  return await Project.destroy({ where: { Id: id } });
};

const createProject = async projectData => {
  projectData.timeForSend = momentService.convertTimeFromSecondsToUTC(projectData.timeForSend);

  const project = await createIfNotExist(Project, { name: projectData.name }, { ...projectData });

  if (project) {
    RelationHelper.createRelations(projectData.assignedUsers.map(member => member.id), project.id);
  }

  return {
    ...lodash.pick(project, [
      'id',
      'name',
      'greeting',
      'signature',
      'timeForSend',
      'addressees',
      'copyAddressees',
    ]),
    assignedUsers: projectData.assignedUsers,
  };
};

const updateProjectById = async (id, projectData) => {
  const updatedTimeForSend = momentService.convertTimeFromSecondsToUTC(projectData.timeForSend);

  const isUpdatedProject = await Project.update(
    {
      ...lodash.pick(projectData, [
        'id',
        'name',
        'greeting',
        'signature',
        'addressees',
        'copyAddressees',
      ]),
      timeForSend: updatedTimeForSend,
    },
    {
      where: { Id: id },
    }
  );

  const assignedUsersIds = projectData.assignedUsers.map(user => user.id);

  RelationHelper.compareAndUpdateRelations(id, assignedUsersIds);

  if (isUpdatedProject[0] === 1) {
    return {
      ...lodash.pick(projectData, [
        'id',
        'name',
        'greeting',
        'signature',
        'timeForSend',
        'addressees',
        'copyAddressees',
      ]),
      assignedUsers: projectData.assignedUsers,
    };
  } else {
    throw new Error(`Project ${projectData.name} can not be updated`);
  }
};

const getNotifiableProjects = async () => {
  return await Project.scope('timeScope').findAll({
    attributes: ['name', 'timeForSend'],
    include: [
      {
        model: ProjectUser,
        attributes: {
          exclude: ['UserId', 'ProjectId'],
        },
        required: true,
        include: [
          {
            model: User,
            attributes: ['id', 'username'],
            include: [
              { model: Reminder, attributes: ['value'], required: true },
              {
                model: StatusHistory.scope('today'),
                required: false,
                attributes: ['status'],
              },
            ],
          },
        ],
      },
    ],
  });
};

const getCurrentSendProjects = async () => {
  return await Project.scope('now').findAll();
};

const updateProjectSendStatus = async id => {
  await Project.update({ isSentToday: true }, { fields: ['isSentToday'], where: { Id: id } });
};

const resetStatusOfProjects = async () => {
  await Project.update(
    { isSentToday: false },
    { fields: ['isSentToday'], where: { isSentToday: true } }
  );
};

export default {
  getProjects,
  getProjectsByUserId,
  createProject,
  removeProjectById,
  updateProjectById,
  getNotifiableProjects,
  getCurrentSendProjects,
  updateProjectSendStatus,
  resetStatusOfProjects,
};
