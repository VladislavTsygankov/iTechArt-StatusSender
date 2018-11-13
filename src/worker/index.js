import { parentPort } from 'worker_threads';
import { isTimeToSendStatus } from './worker-service/check-time';

setInterval(() => {
  isTimeToSendStatus().then(response =>
    parentPort.postMessage({
      isMail: response,
    })
  );
}, 5000);
