const router = require('express').Router();
const { isDoctor } = require('../middlewares/authMiddleware');
const servicesServices = require('../services/servicesServices');

router.get('/all', async (req, res) => {
    try {
        const services = await servicesServices.getAll().lean();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/buy/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { serviceId, ownerId } = req.body;
        await servicesServices.buyService(serviceId, id, ownerId);
        res.status(200).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/doctor/all/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const services = await servicesServices.getAllForDoctor(id);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/user/all/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const services = await servicesServices.getAllForUser(id);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/create', isDoctor, async (req, res) => {
    try {
        const serviceData = req.body;
        const user = req.user.id;

        await servicesServices.create(serviceData, user);

        res.status(200).json({ status: 'Success' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating service' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await servicesServices.getOne(serviceId);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
        console.log(serviceId);
        await servicesServices.delete(serviceId);
        res.status(200).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
        const newServiceData = req.body;

        await servicesServices.edit(serviceId, newServiceData);
        res.status(200).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

module.exports = router;