import { MAIL_DOMAIN_ITECHART, ONLY_WORDS_REGULAR_EXP } from '../constants/mailgun';
import momentService from '../../services/moment-service';

const createTextMessage = ({ greeting, signature, statuses }) => {
  const statusesText = statuses
    .map(status => `${status.User.username.toUpperCase()} : \n ${status.status}`)
    .join('\n\n');

  return `${greeting} \n ${
    momentService.getCurrentUTCDate().date
  } \n ${statusesText} \n ${signature} \n`;
};

const getValidAddresseesString = addresseesString => {
  return addresseesString
    .match(ONLY_WORDS_REGULAR_EXP)
    .map(address => `${address}${MAIL_DOMAIN_ITECHART}`)
    .join(', ');
};

export { createTextMessage, getValidAddresseesString };
