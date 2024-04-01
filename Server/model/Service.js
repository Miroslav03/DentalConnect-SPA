const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
    },
    signed: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;