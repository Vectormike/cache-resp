const httpStatus = require('http-status');
const fetch = require('node-fetch');
const ApiError = require('../utils/ApiError');

const getUsers = async () => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
  }
  return users;
};

module.exports = {
  getUsers,
};
