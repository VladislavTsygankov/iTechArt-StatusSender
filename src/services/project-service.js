import moment from 'moment';
import { Project } from '../db/models';

const getProject = async id => {
  if (id) {
    const project = await Project.findById(id);
    
    return {
      name: project.name,
      timeForSend: moment(project.timeForSend).format('hh:mm'),
      addressees: project.addressees,
      copyAddressees: project.copyAddressees,
      greeting: project.greeting,
      signature: project.signature,
    };
  }

  return await Project.findAll().map(project => {
    return {
      name: project.name,
      timeForSend: moment(project.timeForSend).format('hh:mm'),
      addressees: project.addressees,
      copyAddressees: project.copyAddressees,
      greeting: project.greeting,
      signature: project.signature,
    };
  });
};

const createProject = async projectData => {
  const projectName = projectData.name;

  let project = await Project.findOne({ where: { name: projectName } });

  if (!project) {
    project = new Project({ ...projectData });

    return await project.save();
  } else {
    throw new Error(`Project ${projectName} is already exist`);
  }
};

const removeProjectById = async id => {
  return await Project.destroy({
    where: {
      Id: id,
    },
  });
};

const updateProjectById = async (id, projectData) => {
  await Project.update(projectData, {
    where: {
      Id: id,
    },
  });

  return await Project.findById(id);
};

export default {
  getProject,
  createProject,
  removeProjectById,
  updateProjectById,
};
