import momentService from './moment-service';
import { StatusHistory, Project, User } from '../db/models';
import createIfNotExist from './helpers/create-if-not-exist';

const PAGE_SIZE = 10;

const createStatus = async ({ UserId, ProjectId, status }) => {
  if (!momentService.checkWeekend()) {
    return createIfNotExist(
      StatusHistory,
      {
        date: momentService.getCurrentUTCDate().date,
        UserId,
        ProjectId,
      },
      {
        date: momentService.getCurrentUTCDate().date,
        time: momentService.getCurrentUTCDate().time,
        UserId,
        ProjectId,
        status,
      }
    );
  } else {
    throw new Error('You are can not send status at the weekend');
  }
};

const getHistory = async pageId => {
  const statuses = await StatusHistory.findAll({
    limit: PAGE_SIZE,
    offset: +pageId,
    include: [{ model: Project, attributes: ['name'] }, { model: User, attributes: ['username'] }],
  });

  return {
    statuses,
    currentPage: +pageId,
  };
};

const getHistoryByUserId = async (pageId, userId) => {
  const statuses = await StatusHistory.findAll({
    limit: PAGE_SIZE,
    offset: +pageId,
    where: { UserId: userId },
    include: [{ model: Project, attributes: ['name'] }],
  });

  return {
    statuses,
    currentPage: +pageId,
  };
};

const getCurrentStatus = async (projectId, userId) => {
  let status = await StatusHistory.findOne({
    where: {
      UserId: userId,
      ProjectId: projectId,
      date: momentService.getCurrentUTCDate().date,
    },
  });

  return status;
};


export default {
  createStatus,
  getHistory,
  getHistoryByUserId,
  getCurrentStatus,
};
