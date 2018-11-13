import momentService from './moment-service';
import { StatusHistory, Project, User } from '../db/models';

const PAGE_SIZE = 10;

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
  } else if (statusRecord) {
    throw new Error('This status is already exists');
  } else if (momentService.checkWeekend()) {
    throw new Error('You are can not send status at the weekend');
  }
};

const getHistory = async pageId => {
  const statuses = await StatusHistory.findAll({
    include: [
      { model: Project, attributes: ['name'] },
      { model: User, attributes: ['username'] },
    ],
  }).map(statusRecord => {
    statusRecord.time = momentService.convertTime(statusRecord.time);

    return statusRecord;
  });

  return {
    statuses: statuses.reverse().slice(
      pageId * PAGE_SIZE,
      pageId * PAGE_SIZE + PAGE_SIZE
    ),
    currentPage: +pageId,
    pages: Math.ceil(statuses.length / PAGE_SIZE),
  };
};

const getHistoryByUserId = async (pageId, userId) => {
  const statuses = await StatusHistory.findAll({
    where: { UserId: userId },
    include: [{ model: Project, attributes: ['name'] }],
  }).map(statusRecord => {
    statusRecord.time = momentService.convertTime(statusRecord.time);

    return statusRecord;
  });

  let currentPage;

  if (pageId > statuses.length - 1) {
    currentPage = 0;
  } else if (pageId < 0) {
    currentPage = statuses.length - 1;
  } else {
    currentPage = pageId;
  }

  return {
    statuses: statuses.slice(
      currentPage * PAGE_SIZE,
      currentPage * PAGE_SIZE + PAGE_SIZE
    ),
    currentPage: +currentPage,
  };
};

const getCurrentStatus = async (projectId, userId) => {
  let status = await StatusHistory.findOne({
    where: {
      UserId: userId,
      ProjectId: projectId,
      date: momentService.getCurrentDate(),
    },
  });

  if (status) {
    status.time = momentService.convertTime(status.time);
  }

  return status;
};

export default {
  createStatus,
  getHistory,
  getHistoryByUserId,
  getCurrentStatus,
};
