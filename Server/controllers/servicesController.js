const router = require('express').Router();
const { isDoctor } = require('../middlewares/authMiddleware');
const servicesServices = require('../services/servicesServices');

router.get('/all', async (req, res) => {
    try {
        const services = await servicesServices.getAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/all/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const services = await servicesServices.getAllForDoctor(id);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const serviceData = req.body;
        const user = req.user._id;

        await servicesServices.create(serviceData, user);

        res.status(200).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const serviceId = req.params._id;

        const service = await servicesServices.getOne(serviceId);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const serviceId = req.params._id;

        await servicesServices.delete(serviceId);
        res.status(200).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const serviceId = req.params._id;
        const newServiceData = req.body;

        await servicesServices.edit(serviceId, newServiceData);
        res.status(200).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

module.exports = router;