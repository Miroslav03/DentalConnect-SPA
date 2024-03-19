const User = require('../model/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../environment/variables');
const bcrypt = require('bcrypt');

exports.register = async (userData) => {
    try {
        const user = User.create(userData);

        const userToken = await getUserToken(user);

        return {
            id: user._id,
            accessToken: userToken,
            username: user.username,
            email: user.email,
        }
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('User with the provided email already exists.');
        } else if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
        } else {
            console.error('An unexpected error occurred during user registration:', error);
            throw new Error('An unexpected error occurred during user registration. Please try again later.');
        }
    }

};


exports.login = async (userData) => {

    try {
        const user = User.findOne({ email: userData.email });

        if (!user) {
            throw new Error('Email or password doesn\'t match');
        }

        const isValid = await bcrypt.compare(userData.password, user.password);

        if (!isValid) {
            throw new Error('Email or password doesn\'t match');
        }

        const userToken = getUserToken(user)

        return {
            id: user._id,
            accessToken: userToken,
            username: user.username,
            email: user.email,
        }
    } catch (error) {
        throw new Error('An error occurred during login.');
    }
};

function getUserToken(user) {
    return jwt.sign({ id: user._id, email: user.email, username: user.username }, SECRET);
};