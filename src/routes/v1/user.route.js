const express = require('express');
const { get } = require('../../config/redis');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.get('/', get, userController.getAll);

module.exports = router;
