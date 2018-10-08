import jwt from 'jsonwebtoken';
import config from '../web/config';

const { secret } = config.env.jwt;

export default {
  genToken(data) {
    return jwt.sign(data, secret);
  },

  verify(token) {
    return jwt.verify(token, secret);
  },
};
