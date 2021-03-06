const redis = require('redis');
const app = require('./app');
const logger = require('./config/logger');
const config = require('./config/config');
const { redisHost, redisPort } = require('./config/config');

let server;

const client = redis.createClient(redisPort, redisHost);

client.on('connect', function () {
  logger.info('Redis client connected');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

client.on('error', function (err) {
  logger.debug(`Something went wrong ${err}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
