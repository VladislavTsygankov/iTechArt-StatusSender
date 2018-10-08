import moment from 'moment';
import { StatusHistory, Project, User } from '../db/models';

const createStatus = async statusInfo => {
  const { UserId, ProjectId, status } = statusInfo;
  const dateNow = new Date();

  let statusRecord = await StatusHistory.findOne({
    where: {
      date: `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`,
      time: `${dateNow.getUTCHours()}:${dateNow.getUTCMinutes()}:${dateNow.getUTCSeconds()}`,
      UserId,
      ProjectId,
      status,
    },
  });

  if (!statusRecord) {
    statusRecord = new StatusHistory({
      date: `${dateNow.getUTCFullYear()}-${dateNow.getUTCMonth()}-${dateNow.getUTCDate()}`,
      time: `${dateNow.getUTCHours()}:${dateNow.getUTCMinutes()}:${dateNow.getUTCSeconds()}`,
      UserId,
      ProjectId,
      status,
    });

    return await statusRecord.save();
  } else {
    throw new Error('this status is already exist');
  }
};

const getHistory = async () => {
  return await StatusHistory.findAll({ include: [{ model: Project }, { model: User }] }).map(foundStatus => {
    return {
      status: foundStatus.status,
      project: foundStatus.Project.name,
      username: foundStatus.User.username,
      date: moment(foundStatus.date).format('MMMM Do YYYY'),
      time: moment(foundStatus.time).format('hh:mm:ss a'),
    };
  });
};

const getHistoryByUserId = async id => {
  return await StatusHistory.findAll({ where: { UserId: id }, include: [{ model: Project }] }).map(
    foundStatus => {
      return {
        status: foundStatus.status,
        project: foundStatus.Project.name,
        date: moment(foundStatus.date).format('MMMM Do YYYY'),
        time: moment(foundStatus.time).format('hh:mm:ss a'),
      };
    },
  );
};

export default { createStatus, getHistory, getHistoryByUserId };
