import jwtService from './jwt-service';
import bcrypt from 'bcryptjs';
import { User } from '../db/models';

const signIn = async userInfo => {
  const user = await User.findOne({ where: { username: userInfo.username } });

  if (!user) {
    throw new Error('Incorrect username');
  }

  if (!bcrypt.compareSync(userInfo.password, user.password)) {
    throw new Error('Invalid password');
  }

  return {
    user: {
      username: user.username,
      role: user.role,
      id: user.id,
    },
    token: jwtService.genToken(user.id),
  };
};

export default { signIn };
