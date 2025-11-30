const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
