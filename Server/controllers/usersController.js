const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const userService = require('../services/userServices');

router.post('/register', auth, async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await userService.register({ username, email, password });

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user registration' });
    }

});

router.post('/login', auth, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.login({ email, password });

        if (!user) {
            res.status(401).json({ error: 'Email or password is invalid' })
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user login' });
    }

});

module.exports = router;