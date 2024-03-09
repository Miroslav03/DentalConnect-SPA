const router = require('express').Router();

const usersController = require('./controllers/usersController');


router.use('/users', usersController);

module.exports = router;