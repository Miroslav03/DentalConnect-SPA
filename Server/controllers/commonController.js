const router = require('express').Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const doctorService = require('../services/doctorServices');
const userService = require('../services/userServices');


router.get('/profile', verifyToken, async (req, res) => {
    try {
        const id = req.user.id;
        const userType = req.user.profile;

        let profile;

        if (userType === 'doctor') {
            profile = await doctorService.getDoctorById(id);
        } else if (userType === 'user') {
            profile = await userService.getUserById(id)
        }

        if (!profile) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user profile.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorService.login({ email, password });

        const user = await userService.login({ email, password });

        if (!doctor && !user) {
            return res.status(401).json({ error: 'Email or password is invalid' });
        }

        const loggedIn = doctor || user

        if (process.env.NODE_ENV === 'production') {
            res.cookie('authToken', loggedIn.accessToken, { httpOnly: true, sameSite: 'None', secure: true })
        } else {
            res.cookie('authToken', loggedIn.accessToken, { httpOnly: true, sameSite: 'None', secure: true })
        }

        res.status(200).json(loggedIn);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'An error occurred during user login' });
    }
})


router.get('/logout', verifyToken, (req, res) => {
    res.clearCookie('authToken',).status(200).json({ message: 'Logout successful' })
})


module.exports = router