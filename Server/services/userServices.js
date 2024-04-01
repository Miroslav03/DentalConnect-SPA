const User = require('../model/User');
const bcrypt = require('bcrypt');
const { getUserToken } = require('../utils/jwt');
const { getErrors } = require('../utils/errors');

exports.register = async (userData) => {
    try {
        const user = await User.create(userData);
        const userToken = await getUserToken(user);

        return {
            _id: user._id,
            accessToken: userToken,
            username: user.username,
            email: user.email,
        }
    } catch (error) {
        getErrors(error);
    }
};


exports.login = async (userData) => {

    try {
        const user = await User.findOne({ email: userData.email });

        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(userData.password, user.password);

        if (!isValid) {
            throw new Error('Email or password doesn\'t match');
        }

        const userToken = await getUserToken(user);

        return {
            _id: user._id,
            accessToken: userToken,
            username: user.username,
            email: user.email,
        }
    } catch (error) {
        console.error(error.message)
        throw new Error('An error occurred during login.');
    }
};

exports.getUserById = async (userId) => {
    return await User.findById(userId).select('-password');
};