const jwt = require('../lib/jwt');
const { SECRET } = require('../environment/variables');

exports.getUserToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, username: user.username, profile: 'user' }, SECRET);
};

exports.getDoctorToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, username: user.username, proficiency: user.proficiency, profile: 'doctor' }, SECRET);
};