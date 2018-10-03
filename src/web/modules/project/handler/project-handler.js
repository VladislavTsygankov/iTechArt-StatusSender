import Project from '../../../../db/models/project';
import logger from '../../../utils/logger';
import LoggerLevels from '../../../constants/logger-levels';

const findProject = async (id, ctx, next) => {
  ctx.project = await Project.findById(id);
  logger.log(LoggerLevels.DEBUG, `Found project is - ${JSON.stringify(ctx.project)}`);
  
  return next();
};

export { findProject };
