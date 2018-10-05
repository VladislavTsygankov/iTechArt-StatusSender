import DataTypes from 'sequelize';
import db from '../db-connection';


const Project = db.define(
  'Project',
  {
    name: {
      type: db.Sequelize.STRING,
    },
    timeForSend: {
      type: DataTypes.TIME,
    },
    greeting: {
      type: db.Sequelize.STRING,
    },
    signature: {
      type: db.Sequelize.STRING,
    },
    addressees: {
      type: db.Sequelize.STRING,
    },
    copyAddressees: {
      type: db.Sequelize.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export default Project;
