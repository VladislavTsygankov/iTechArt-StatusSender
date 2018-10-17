import config from '../config';

const checkOrigin = ctx => {
  const requestOrigin = ctx.accept.headers.origin;

  if (!config.env.clientDomainsWhitelist.includes(requestOrigin)) {
    return ctx.throw(`${requestOrigin} is not viable origin`);
  }

  return requestOrigin;
};

export default checkOrigin;
