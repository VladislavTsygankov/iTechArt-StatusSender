import lodash from 'lodash';
import { Op } from 'sequelize';
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
      'addressees',
      'copyAddressees',
    ]),
    assignedUsers: projectData.assignedUsers,
    timeForSend: projectData.timeForSend,
  };
};

const updateProjectById = async (id, projectData) => {
  const isUpdatedProject = await Project.update(
    { ...projectData },
    {
      where: { Id: id },
    }
  );

  const assignedUsersIds = projectData.assignedUsers.map(user => user.id);

  RelationHelper.compareAndUpdateRelations(id, assignedUsersIds);

  if (isUpdatedProject[0] === 1) {
    return {
      ...projectData,
      assignedUsers: projectData.assignedUsers,
    };
  } else {
    throw new Error(`Project ${projectData.name} can not be updated`);
  }
};

const getNotifiableProjects = async () => {
  return await Project.findAll({
    attributes: ['name', 'timeForSend'],
    where: {
      [Op.or]: [
        {
          timeForSend: {
            [Op.between]: [
              momentService.getCurrentTimeWithNotificationPeriod().currentTime,
              momentService.getCurrentTimeWithNotificationPeriod().timeWithNotificationPeriod,
            ],
          },
        },
        {
          lastSentDate: {
            [Op.lt]: momentService.getCurrentUTCDate().date,
          },
        },
      ],
    },
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
                model: StatusHistory,
                where: {
                  date: momentService.getCurrentUTCDate().date,
                },
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
  return await Project.findAll({
    where: {
      timeForSend: {
        [Op.and]: {
          [Op.gte]: momentService.getCurrentTimeWithDeviation().leftDeviation,
          [Op.lte]: momentService.getCurrentTimeWithDeviation().rightDeviation,
        },
      },
    },
    include: [
      {
        model: StatusHistory,
        required: false,
        where: {
          date: momentService.getCurrentUTCDate().date,
        },
        attributes: ['status'],
        include: [{ model: User, attributes: ['username'] }],
      },
    ],
  });
};

const updateLastSendDate = async id => {
  await Project.update(
    { lastSendDate: momentService.getCurrentUTCDate().date },
    { where: { Id: id }, fields: ['LastSentDate'] }
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
  updateLastSendDate,
};
