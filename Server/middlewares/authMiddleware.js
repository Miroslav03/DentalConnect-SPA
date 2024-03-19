const jwt = require('../lib/jwt');
const SECRET = require('../environment/variables');

exports.auth = async (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (!token) {
        return next();
    }

    try {
        const token = jwt.verify(token, SECRET);
        req.user = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
