const express = require('express');
const router = express.Router();
const tasks = require('../controllers/taskController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, tasks.createTask); // authenticated users

router.get('/', auth, role(['admin']), tasks.getTasks); // admin only

router.get('/:id', auth, tasks.getTaskById); // owner or admin

router.put('/:id', auth, tasks.updateTask); // owner or admin

router.delete('/:id', auth, tasks.deleteTask); // owner or admin

module.exports = router;
