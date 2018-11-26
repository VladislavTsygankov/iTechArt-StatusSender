import DataTypes from 'sequelize';
import db from '../db-connection';
import momentService from '../../services/moment-service';
import { Op } from 'sequelize';

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
    isSentToday: {
      type: db.Sequelize.BOOLEAN,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    hooks: {
      afterFind: projects => {
        if (projects && projects.length > 0) {
          return projects.map(project => {
            project.timeForSend = momentService.getSecondsFromTime(project.timeForSend);
          });
        }

        return projects;
      },
    },
    scopes: {
      timeScope: {
        where: {
          [Op.or]: [
            {
              timeForSend: {
                [Op.between]: [
                  momentService.getCurrentTimeWithNotificationPeriod().currentTime,
                  momentService.getCurrentTimeWithNotificationPeriod().timeWithNotificationPeriod,
                ],
              },
            },
            {
              isSentToday: false,
              timeForSend: {
                [Op.lte]: momentService.getCurrentTimeWithNotificationPeriod().currentTime,
              },
            },
          ],
        },
      },
      now: {
        where: {
          timeForSend: {
            [Op.between]: [
              momentService.getCurrentTimeWithDeviation().leftDeviation,
              momentService.getCurrentTimeWithDeviation().rightDeviation,
            ],
          },
        },
      },
    },
  }
);

export default Project;
