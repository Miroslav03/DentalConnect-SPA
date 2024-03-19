const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');

router.post('/register', auth, async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await userService.registerUser({ username, email, password });

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during user registration' });
    }

})

module.exports = router;