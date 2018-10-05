import User from './user';
import Reminder from './reminder';
import Project from './project';
import ProjectUser from './project-user';
import StatusHistory from './status-history';

ProjectUser.belongsTo(Project);
ProjectUser.belongsTo(User);
Reminder.belongsTo(User);
StatusHistory.belongsTo(Project);
StatusHistory.belongsTo(User);

User.hasMany(StatusHistory);
Project.hasMany(StatusHistory);
User.hasMany(Reminder);
Project.hasMany(ProjectUser);
User.hasMany(ProjectUser);

export { User, Reminder, ProjectUser, Project, StatusHistory };
