const express = require('express');

const TaskController = require('./controllers/task');

const router = express.Router();

router.use('/tasks', TaskController);

module.exports = router;
