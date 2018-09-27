import Koa from 'koa';
import startWorker from './services/worker';

const app = new Koa();

startWorker(__dirname + '/workers/worker.js', (err, result) => {
  if (err) {
    return console.error(err);
  }
  console.log('[[Second thread]]');
  console.log('Mail ', result.isMail);
});

setInterval(() => {
  console.log('this is the main thread');
}, 5000);

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const port = 3000;

app.listen(port);
