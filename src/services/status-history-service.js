import momentService from './moment-service';
import { StatusHistory, Project, User } from '../db/models';

const createStatus = async statusInfo => {
  const { UserId, ProjectId, status } = statusInfo;

  let statusRecord = await StatusHistory.findOne({
    where: {
      date: momentService.getCurrentDate(),
      UserId,
      ProjectId,
    },
  });

  if (!statusRecord && !momentService.checkWeekend()) {
    return await StatusHistory.create({
      date: momentService.getCurrentDate(),
      time: momentService.getCurrentUTCTime(),
      UserId,
      ProjectId,
      status,
    });
  } else {
    throw new Error('This status is already exist');
  }
};

const getHistory = async () => {
  return await StatusHistory.findAll({
    include: [{ model: Project, attributes: ['name'] }, { model: User, attributes: ['username'] }],
  }).map(statusRecord => {
    statusRecord.date = momentService.convertDate(statusRecord.date);
    statusRecord.time = momentService.convertTime(statusRecord.time);

    return statusRecord;
  });
};

const getHistoryByUserId = async id => {
  return await StatusHistory.findAll({
    where: { UserId: id },
    include: [{ model: Project, attributes: ['name'] }],
  }).map(statusRecord => {
    statusRecord.date = momentService.convertDate(statusRecord.date);
    statusRecord.time = momentService.convertTime(statusRecord.time);

    return statusRecord;
  });
};

const getCurrentStatus = async (projectId, userId) => {
  return await StatusHistory.findOne({
    where: {
      UserId: userId,
      ProjectId: projectId,
      date: momentService.getCurrentDate(),
    },
  });
};

export default { createStatus, getHistory, getHistoryByUserId, getCurrentStatus };
