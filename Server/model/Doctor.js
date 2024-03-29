const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema({
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
    },
    proficiency: {
        type: String,
        requried: true
    },
    patients: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

doctorSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
})

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;