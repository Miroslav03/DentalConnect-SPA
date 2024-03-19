const router = require('express').Router();
const doctorService = require('../services/doctorServices');
const auth = require('../middlewares/authMiddleware');

router.post('/register', auth, async (req, res) => {
    try {
        const { username, email, proficiency, password } = req.body;

        const doctor = await doctorService.register({ username, email, proficiency, password });

        res.status(200).json(doctor);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user registration' });
    }
});

router.post('/login', auth, async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await userService.login({ email, password });

        if (!doctor) {
            res.status(401).json({ error: 'Email or password is invalid' })
        }
        res.status(200).json(doctor);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user login' });
    }

});



module.exports = router;