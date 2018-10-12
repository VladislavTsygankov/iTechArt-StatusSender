import momentService from './moment-service';
import ProjectUserService from './project-user-service';
import { Project, ProjectUser } from '../db/models';

const getProjects = async () => {
  return await Project.findAll().map(project => {
    project.timeForSend = momentService.convertTime(project.timeForSend);

    return project;
  });
};

const getProjectsByUserId = async id => {
  return await ProjectUser.findAll({
    where: { UserId: id },
    include: [
      {
        model: Project,
        attributes: ['name', 'Id'],
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
  const projectName = projectData.name;
  const { members } = projectData;

  // вот эта штука временная, просто через постман кидается строка а не массив,
  // когда буду кидать с клиент массивом будет норм

  const membersList = members.split(',').map(member => {
    return +member;
  });

  let project = await Project.findOne({ where: { name: projectName } });

  if (!project) {
    project = new Project({ ...projectData });
    await project.save();

    const createdProject = await Project.findOne({ where: { name: projectName } });

    membersList.forEach(member => {
      ProjectUserService.createRelation(member, createdProject.id);
    });

    return project;
  } else {
    throw new Error(`Project ${projectName} is already exist`);
  }
};

const updateProjectById = async (id, projectData) => {
  await Project.update(projectData, { where: { Id: id } });

  const { members } = projectData;
  const project = await Project.findById(id);

  project.timeForSend = momentService.convertTime(project.timeForSend);

  // вот эта штука временная, просто через постман кидается строка а не массив,
  // когда буду кидать с клиент массивом будет норм
  let membersList = members.split(',').map(member => {
    return +member;
  });

  ProjectUserService.compareAndUpdateRelations(project.id, membersList);

  return project;
};

export default {
  getProjects,
  getProjectsByUserId,
  createProject,
  removeProjectById,
  updateProjectById,
};
