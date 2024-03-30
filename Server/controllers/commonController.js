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

        console.log(profile);
        res.status(200).json(profile);

    } catch (error) {
        console.error('Error ', error);
        res.status(500).json({ error: 'An error occurred while fetching user profile.' });
    }
});





module.exports = router