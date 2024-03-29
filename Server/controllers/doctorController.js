const router = require('express').Router();
const doctorService = require('../services/doctorServices');
const auth = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    try {
        const { username, email, proficiency, password } = req.body;

        const doctor = await doctorService.register({ username, email, proficiency, password });

        if (process.env.NODE_ENV === 'production') {
            res.cookie('authToken', doctor.accessToken, { httpOnly: true, sameSite: 'None', secure: true })
        } else {
            res.cookie('authToken', doctor.accessToken, { httpOnly: true, sameSite: 'None', secure: true })
        }
        console.log('Response headers:', res.getHeaders()); // Log headers
        res.status(200).json(doctor);

    } catch (error) {
        console.error('Error ', error)
        res.status(500).json({ error: 'An error occurred during user registration' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await userService.login({ email, password });

        if (!doctor) {
            res.status(401).json({ error: 'Email or password is invalid' })
        }

        if (process.env.NODE_ENV === 'production') {
            res.cookie('accessToken', user.accessToken, { httpOnly: true, sameSite: 'none', secure: true })
        } else {
            res.cookie('accessToken', user.accessToken, { httpOnly: true })
        }
        res.status(200).json(doctor);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user login' });
    }

});

module.exports = router;