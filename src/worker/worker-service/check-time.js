import { Reminder, Project, User } from '../../db/models';
import momentService from '../../services/moment-service';

const isTimeToSendStatus = async () => {
  const projects = await Project.findAll({
    attributes: ['timeForSend', 'id'],
  }).map(project => {
    project.timeForSend = momentService.getMinutesFromTime(project.timeForSend);
    project = project.dataValues;
    return project;
  });

  return projects.filter(
    project => project.timeForSend === 390 || project.timeForSend === 30
  );
};
export { isTimeToSendStatus };
