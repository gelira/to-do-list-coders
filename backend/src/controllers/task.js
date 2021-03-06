const express = require('express');
const yup = require('yup');

const { validateBody } = require('../middlewares');
const { Task } = require('../models');
const { 
  LIST_PRIORITIES,
  PRIORITIES,
} = require('../utils/consts');

const RULES = {
  CREATE: yup.object({
    title: yup.string().required().trim().max(50),
    description: yup.string().notRequired().trim().max(200), 
    due_date: yup.date().notRequired(),
    priority: yup.string().required().oneOf(LIST_PRIORITIES),
    done: yup.boolean().required(),
  }),
  UPDATE: yup.object({
    title: yup.string().notRequired().trim().max(50),
    description: yup.string().notRequired().trim().max(200), 
    due_date: yup.date().notRequired(),
    priority: yup.string().notRequired().oneOf(LIST_PRIORITIES),
    done: yup.boolean().notRequired(),
  }),
};

// Actions
//#region 
async function listTasks(_, response) {
  try {
    const tasksDueDate = await Task.find({ due_date: { $ne: null } }).sort({ due_date: 1 });
    const tasksRemain = await Task.find({ due_date: null });

    const tasks = [...tasksDueDate, ...tasksRemain];

    return response.json(tasks);
  }
  catch (e) {
    return response.status(400).json(e);
  }
}

async function retrieveTask(request, response) {
  const { id } = request.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return response.sendStatus(404);
    }

    return response.json(task);
  }
  catch (e) {
    return response.status(400).json(e);
  }
}

async function createTask(request, response) {
  const {
    title,
    priority,
    done,
    description = '', 
    due_date = null,
  } = request.validatedBody;

  try {
    const task = await Task.create({
      title,
      priority,
      done,
      description,
      due_date,
    });

    return response.status(201).json(task);
  }
  catch (e) {
    return response.status(400).json(e);
  }
}

async function updateTask(request, response) {
  const { id } = request.params;

  const {
    title,
    priority,
    done,
    description, 
    due_date,
  } = request.validatedBody;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return response.sendStatus(404);
    }

    if (title !== undefined) {
      task.title = title;
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (done !== undefined) {
      task.done = done;
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (due_date !== undefined) {
      task.due_date = due_date;
    }

    await task.save();

    return response.json(task);
  }
  catch (e) {
    return response.status(400).json(e);
  }
}

async function deleteTask(request, response) {
  const { id } = request.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return response.sendStatus(404);
    }

    await task.remove();

    return response.sendStatus(204);
  }
  catch (e) {
    return response.status(400).json(e);
  }
}
//#endregion

// Routes
//#region 
const router = express.Router();

router.get('/', listTasks);
router.get('/:id', retrieveTask);
router.post('/', validateBody(RULES.CREATE), createTask);
router.patch('/:id', validateBody(RULES.UPDATE), updateTask);
router.delete('/:id', deleteTask);
//#endregion

module.exports = router;
