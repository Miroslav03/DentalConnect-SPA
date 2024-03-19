const router = require('express').Router();

const usersController = require('./controllers/usersController');
const doctorController = require('./controllers/doctorController');
const servicesController = require('./controllers/servicesController');

router.use('/auth/user', usersController);
router.use('/auth/doctor', doctorController);
router.use('/services', servicesController);

module.exports = router;