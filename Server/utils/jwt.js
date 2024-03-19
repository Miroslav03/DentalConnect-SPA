const jwt = require('../lib/jwt');

exports.getUserToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, username: user.username }, SECRET);
};

exports.getDoctorToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, username: user.username, proficiency: user.proficiency }, SECRET);
};