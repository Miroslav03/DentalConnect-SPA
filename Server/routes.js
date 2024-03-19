const router = require('express').Router();

const usersController = require('./controllers/usersController');
const doctorController = require('./controllers/doctorController');

router.use('/auth/user', usersController);
router.use('/auth/doctor', doctorController);

module.exports = router;