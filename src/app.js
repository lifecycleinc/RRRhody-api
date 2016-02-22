import express from 'express';
import logger from 'morgan';
import router from './router';

const app = express();

app.use(logger(app.get('env') === 'development' ? 'dev' : 'common'));

app.get('/', (req, res) => {
  res.send('ok');
});

app.use('/api/v1', router);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

export default app;
