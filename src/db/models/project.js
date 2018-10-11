import DataTypes from 'sequelize';
import db from '../db-connection';


const Project = db.define(
  'Project',
  {
    name: {
      type: db.Sequelize.STRING(50),
    },
    timeForSend: {
      type: DataTypes.TIME,
    },
    greeting: {
      type: db.Sequelize.STRING(100),
    },
    signature: {
      type: db.Sequelize.STRING(150),
    },
    addressees: {
      type: db.Sequelize.STRING(200),
    },
    copyAddressees: {
      type: db.Sequelize.STRING(200),
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export default Project;
