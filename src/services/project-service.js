import lodash from 'lodash';
import momentService from './moment-service';
import ProjectUserService from './project-user-service';
import { Project, ProjectUser, User } from '../db/models';

const getProjects = async () => {
  return await Project.findAll({
    include: [
      {
        model: ProjectUser,
        include: [{ model: User, attributes: ['id', 'username', 'role'] }],
      },
    ],
  }).map(project => {
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
      assignedUsers:
        project.ProjectUsers.length > 0
          ? project.ProjectUsers.map(relation => relation.User.dataValues)
          : [],
    };
  });
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
  let project = await Project.findOne({ where: { name: projectData.name } });

  if (!project) {
    projectData.timeForSend = momentService.convertTimeFromSecondsToUTC(
      projectData.timeForSend
    );

    project = await Project.create({ ...projectData });

    projectData.assignedUsers.forEach(member => {
      ProjectUserService.createRelation(member.id, project.dataValues.id);
    });

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
  } else {
    throw new Error(`Project ${projectData.name} is already exists`);
  }
};

const updateProjectById = async (id, projectData) => {
  projectData.timeForSend = momentService.convertTimeFromSecondsToUTC(
    projectData.timeForSend
  );

  const isUpdatedProject = await Project.update(projectData, {
    where: { Id: id },
  });

  const assignedUsersIds = projectData.assignedUsers.map(user => user.id);

  ProjectUserService.compareAndUpdateRelations(id, assignedUsersIds);

  if (isUpdatedProject[0] === 1) {
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
  } else {
    throw new Error(`Project ${projectData.name} can not be updated`);
  }
};

export default {
  getProjects,
  getProjectsByUserId,
  createProject,
  removeProjectById,
  updateProjectById,
};
