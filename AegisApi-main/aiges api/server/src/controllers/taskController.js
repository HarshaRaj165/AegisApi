const db = require('../models');
const { taskSchema } = require('../utils/validator');

exports.createTask = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = await db.Task.create({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    // Admin only
    const tasks = await db.Task.findAll({ include: ['owner'] });
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await db.Task.findByPk(req.params.id, { include: ['owner'] });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    res.json(task);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await task.update(req.body);
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) { next(err); }
};
