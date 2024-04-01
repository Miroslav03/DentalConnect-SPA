const jwt = require('../lib/jwt');
const { SECRET } = require('../environment/variables');

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

exports.isDoctor = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Unothorized' });;
    }

    try {
        const decoded = await jwt.verify(token, SECRET);

        if (decoded.proficiency && decoded.profile === 'doctor') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.isUser = (req, res, next) => {
    const token = req.haeders['x-authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);

        if (decoded.profile === 'user') {
            return next();
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Unothorized' });;
    }

    try {
        const decoded = await jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}