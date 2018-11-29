import Mailgun from 'mailgun-js';
import { DOMAIN_NAME, PRIVATE_API_KEY } from '../config';
import momentService from '../../services/moment-service';
import { getValidAddresseesString, createTextMessage } from '../helpers/mailgun-messages';
import { FROM_STATUS_SENDER, MAIL_DOMAIN_ITECHART } from '../constants/mailgun';

const sendNotification = ({ username, timeForSend, projectName, reminderValue }) => {
  return sendMail({
    from: FROM_STATUS_SENDER,
    to: `${username}${MAIL_DOMAIN_ITECHART}`,
    subject: `${momentService.formatTimeFromUTC(
      reminderValue
    )} left before send ${projectName} status`,
    text: `Please, do not forget about your status on ${projectName}project which will send at ${timeForSend}`,
  });
};

const sendProjectStatus = ({
  name,
  addressees,
  copyAddressees,
  greeting,
  signature,
  StatusHistories,
}) => {
  return sendMail({
    from: FROM_STATUS_SENDER,
    to: getValidAddresseesString(addressees),
    cc: getValidAddresseesString(copyAddressees),
    subject: `${name} project status on ${momentService.getCurrentUTCDate().date}`,
    text: createTextMessage({
      greeting,
      signature,
      statuses: StatusHistories,
    }),
  });
};

const sendMail = data => {
  const mailgun = new Mailgun({ apiKey: PRIVATE_API_KEY, domain: DOMAIN_NAME });

  return mailgun.messages().send(data);
};

export default { sendNotification, sendProjectStatus };
