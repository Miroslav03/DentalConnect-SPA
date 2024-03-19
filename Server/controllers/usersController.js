const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');

router.post('/register', auth, async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userService.registerUser({ username, email, password });

    res.json(user);
})

module.exports = router;