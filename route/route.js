const express = require('express');

const router = express.Router();

// Controllers imported
const userController = require('../controller/user');
const notesController = require('../controller/notes');

router.get('/', userController.start);

router.post('/api/user', userController.signup);

router.post('/api/user/login', userController.login);

router.post('/api/note/add', notesController.create);

module.exports = router;