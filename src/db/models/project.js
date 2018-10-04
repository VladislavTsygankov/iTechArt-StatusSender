import Sequelize from 'sequelize';
import DataTypes from 'sequelize';
import db from '../db-connection';

const Project = db.define(
  'project',
  {
    name: {
      type: Sequelize.STRING,
    },
    timeForSend: {
      type: DataTypes.TIME,
    },
    greeting: {
      type: Sequelize.STRING,
    },
    signature: {
      type: Sequelize.STRING,
    },
    addressees: {
      type: Sequelize.STRING,
    },
    copyAddressees: {
      type: Sequelize.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export default Project;
