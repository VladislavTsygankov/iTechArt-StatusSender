import { parentPort } from 'worker_threads';
import sendMail from '../services/mailgun';

const sendDate = {
  hours: 11,
  minutes: 50,
  seconds: 30,
};

setInterval(() => {
  const date = new Date();

  if (date.getSeconds() === sendDate.seconds) {
    parentPort.postMessage({ isMail: 'Mail was sent' });
    sendMail();
  } else {
    parentPort.postMessage({ isMail: ' not yet' });
  }
}, 1000);
