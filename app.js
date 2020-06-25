const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const host = '0.0.0.0';
const port = 3000;

const app = express();
// app.use(morgan('combined', { stream: logger.stream }));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup routes
const router = require('./routes');

app.use(router);

// initial status
if (process.env.NODE_ENV !== 'test') {
  const server = http.createServer(app);
  // eslint-disable-next-line no-console
  server.listen(port, host, () => console.log(`Listening at http://${host}:${port}`));
}

module.exports = app;
