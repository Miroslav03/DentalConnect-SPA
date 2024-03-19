const User = require('../model/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../environment/variables');


exports.register = (userData) => {
    const user = User.create(userData);

    const userToken = getUserToken(user);

    return {
        id: user._id,
        accessToken: userToken,
        username: user.username,
        email: user.email,
    }
};


function getUserToken(user) {
    return jwt.sign({ id: user._id, email: user.email, username: user.username }, SECRET);
}