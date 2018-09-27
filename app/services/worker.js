import { Worker } from 'worker_threads';

const startWorker = (path, callback) => {
  const w = new Worker(path, { workerData: null });
  w.on('message', msg => {
    callback(null, msg);
  });
  w.on('error', callback);
  w.on('exit', code => {
    if (code != 0) {
      console.error(new Error(`Worker stopped with exit code ${code}`));
    }
  });
  return w;
};

export default startWorker;
