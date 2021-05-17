/* eslint-disable no-unused-expressions */
const redis = require('redis');
const { log } = require('./logger');
const { redisHost, redisPort } = require('./config');

const client = redis.createClient(redisPort, redisHost);

client.on('connect', function () {
  log('Redis client connected');
});

client.on('error', function (err) {
  log(`Something went wrong ${err}`);
});

const set = (key, value) => {
  client.set(key, JSON.stringify(value));
};

const get = (req, res, next) => {
  const key = req.route.path;
  client.get(key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};

module.exports = { set, get };
