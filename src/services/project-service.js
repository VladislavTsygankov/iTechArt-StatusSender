import { Project } from '../db/models';

const getProject = async id => {
  if (id) {
    return await Project.findById(id);
  }

  return await Project.findAll();
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
