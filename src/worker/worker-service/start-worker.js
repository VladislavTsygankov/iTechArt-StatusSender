import { Worker } from 'worker_threads';

const startWorker = (path, callback) => {
  const worker = new Worker(path, { workerData: null });

  worker.on('message', msg => {
    callback(null, msg);
  });
  worker.on('error', callback);
  worker.on('exit', code => {
    if (code != 0) {
      console.error(new Error(`Worker stopped with exit code ${code}`));
    }
  });

  return worker;
};

export default startWorker;
