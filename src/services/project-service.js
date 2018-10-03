import Project from '../db/models/project';

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

export default { createProject, removeProjectById, updateProjectById };
