import momentService from './moment-service';
import { StatusHistory, Project, User } from '../db/models';

const createStatus = async statusInfo => {
  const { UserId, ProjectId, status } = statusInfo;

  let statusRecord = await StatusHistory.findOne({
    where: {
      date: momentService.getCurrentDate(),
      time: momentService.getCurrentUTCTime(),
      UserId,
      ProjectId,
      status,
    },
  });

  if (!statusRecord) {
    statusRecord = new StatusHistory({
      date: momentService.getCurrentDate(),
      time: momentService.getCurrentUTCTime(),
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
  return await StatusHistory.findAll({
    attributes: ['status', 'date', 'time'],
    include: [{ model: Project, attributes: ['name'] }, { model: User, attributes: ['username'] }],
  }).map(statusRecord => {
    statusRecord.date = momentService.convertDate(statusRecord.date);
    statusRecord.time = momentService.convertTime(statusRecord.time);

    return statusRecord;
  });
};

const getHistoryByUserId = async id => {
  return await StatusHistory.findAll({
    attributes: ['status', 'date', 'time'],
    where: { UserId: id },
    include: [{ model: Project, attributes: ['name'] }],
  }).map(statusRecord => {
    statusRecord.date = momentService.convertDate(statusRecord.date);
    statusRecord.time = momentService.convertTime(statusRecord.time);

    return statusRecord;
  });
};

export default { createStatus, getHistory, getHistoryByUserId };
