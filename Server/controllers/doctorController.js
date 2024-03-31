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
        res.status(200).json(doctor);

    } catch (error) {
        console.error('Error ', error)
        res.status(500).json({ error: 'An error occurred during user registration' });
    }
});



module.exports = router;