import db from '../db-connection';

const ProjectUser = db.define(
  'ProjectUser',
  {},
  {
    createdAt: false,
    updatedAt: false,
  }
);

export default ProjectUser;
