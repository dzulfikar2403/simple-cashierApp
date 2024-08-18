const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersAuthController');

router.get('/',usersController.getDataUsers)

router.post('/register',usersController.registerPost);
router.post('/login',usersController.loginPost);
router.delete('/:id',usersController.deleteUsers)

module.exports = router;