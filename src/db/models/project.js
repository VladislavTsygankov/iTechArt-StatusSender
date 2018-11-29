import DataTypes from 'sequelize';
import db from '../db-connection';
import momentService from '../../services/moment-service';

const Project = db.define(
  'Project',
  {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id',
    },
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
    lastSentDate: {
      type: db.Sequelize.DATEONLY,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    hooks: {
      afterFind: projects => {
        if (projects && projects.length > 0) {
          return projects.map(project => {
            project.timeForSend = momentService.formatTime(project.timeForSend);
          });
        }

        return projects;
      },
      beforeCreate: project => {
        project.timeForSend = momentService.convertTimeToUTC(project.timeForSend);

        return project;
      },
      beforeBulkUpdate: ({ attributes }) => {
        attributes.timeForSend = momentService.convertTimeToUTC(attributes.timeForSend);

        return attributes;
      },
    },
  }
);

export default Project;
