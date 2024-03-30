const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const userService = require('../services/userServices');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await userService.register({ username, email, password });

        if (process.env.NODE_ENV === 'production') {
            res.cookie('authToken', user.accessToken, { httpOnly: true, sameSite: 'None', secure: true })
        } else {
            res.cookie('authToken', user.accessToken, { httpOnly: true, sameSite: 'None', secure: true })
        }
        res.status(200).json(user);


    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user registration' });
    }

});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.login({ email, password });

        if (!user) {
            res.status(401).json({ error: 'Email or password is invalid' })
        }

        if (process.env.NODE_ENV === 'production') {
            res.cookie('accessToken', user.accessToken, { httpOnly: true, sameSite: 'none', secure: true })
        } else {
            res.cookie('accessToken', user.accessToken, { httpOnly: true })
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user login' });
    }

});

module.exports = router;