import ProjectService from '../..//services/project-service';
import MailgunService from '../mailgun-service/mailgun';
import { isTimeToSendNotification } from '../helpers/reminder';

const getProjectsToSend = async () => {
  const projects = await ProjectService.getCurrentSendProject();

  projects.forEach(project => {
    MailgunService.sendProjectStatus(project);
    ProjectService.updateProjectSendStatus(project.id);
  });
};

const getNotificationsToSend = async () => {
  const projects = await ProjectService.getNotifiableProjects();

  projects.forEach(project => {
    project.ProjectUsers.forEach(relation => {
      if (relation.User !== null && !relation.User.StatusHistories[0]) {
        relation.User.Reminders.forEach(reminder => {
          if (isTimeToSendNotification(reminder.value, project.timeForSend)) {
            MailgunService.sendNotification({
              username: relation.User.username,
              timeForSend: project.timeForSend,
              projectName: project.name,
              reminderValue: reminder.value,
            });
          }
        });
      }
    });
  });
};

export { getProjectsToSend, getNotificationsToSend };
