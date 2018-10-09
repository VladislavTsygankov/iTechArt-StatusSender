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

User.hasMany(StatusHistory, { onDelete: 'CASCADE' });
User.hasMany(Reminder, { onDelete: 'CASCADE' });
User.hasMany(ProjectUser, { onDelete: 'CASCADE' });

Project.hasMany(StatusHistory, { onDelete: 'CASCADE' });
Project.hasMany(ProjectUser, { onDelete: 'CASCADE' });


export { User, Reminder, ProjectUser, Project, StatusHistory };
