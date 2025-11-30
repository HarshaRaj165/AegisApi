const Joi = require('joi');

exports.registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  completed: Joi.boolean(),
});
