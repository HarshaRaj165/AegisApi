const db = require('../models');
const { registerSchema, loginSchema } = require('../utils/validator');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, password } = req.body;
    const userExist = await db.User.findOne({ where: { username } });
    if (userExist) return res.status(409).json({ message: 'Username already exists' });

    const user = await db.User.create({ username, password, role: 'user' });
    res.status(201).json({ message: 'Registered successfully', user: { id: user.id, username: user.username } });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user.id, username: user.username, role: user.role });
    res.json({ token });
  } catch (err) { next(err); }
};
