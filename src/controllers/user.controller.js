const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { set } = require('../config/redis');
const { userService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  set(req.route.path, users);
  res.status(httpStatus.OK).send(users);
});

module.exports = { getAll };
