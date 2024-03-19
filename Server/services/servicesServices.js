const Service = require('../model/Service');


exports.getAll = () => Service.find().populate('signed');

exports.getAllForDoctor = async (id) => {
    try {
        const services = await Service.find({ owner: id }).populate('signed');
        return services;
    } catch (error) {
        throw new Error('Error while fetching services: ' + error.message);
    }
};

exports.create = async (servicesData, userId) => {
    await Service.create({
        owner: userId,
        ...servicesData
    });
};

exports.getOne = (serviceId) => Service.findById(serviceId).populate('owner').populate('signed');

exports.delete = (serviceId) => Service.findByIdAndDelete(serviceId);

exports.edit = (serviceId, newData) => Service.findByIdAndUpdate(serviceId, newData);