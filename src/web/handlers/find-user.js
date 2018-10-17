import { User } from '../../db/models';
import jwtService from '../../services/jwt-service';

const findUser = async (ctx, next) => {
  const token = ctx.header.authorization.split(' ')[1];

  ctx.user = await User.findOne({ where: { Id: jwtService.verify(token) } });

  return next();
};

export default findUser;
