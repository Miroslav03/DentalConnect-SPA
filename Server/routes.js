const router = require('express').Router();

const usersController = require('./controllers/usersController');


router.use('/auth/user', usersController);

module.exports = router;