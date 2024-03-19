const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function () {
    const hash = bcrypt.hash(this.password, 12);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;