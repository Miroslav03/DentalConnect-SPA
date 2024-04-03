const Service = require('../model/Service');
const Doctor = require('../model/Doctor')

exports.getAll = () => Service.find().populate('signed');

exports.getAllForDoctor = async (id) => {
    try {
        const services = await Service.find({ owner: id }).populate('signed');
        return services;
    } catch (error) {
        throw new Error('Error while fetching services: ' + error.message);
    }
};


exports.getAllForUser = async (id) => {
    try {
        const services = await Service.find({ signed: { $in: [id] } }).populate('signed');
        return services;
    } catch (error) {
        throw new Error('Error while fetching services: ' + error.message);
    }
};

exports.create = async (servicesData, userId) => {
    return await Service.create({
        owner: userId,
        ...servicesData
    });
};

exports.buyService = async (idService, idUser, idDoctor) => {
    await Service.updateOne({ _id: idService }, { $push: { signed: idUser } });
    await Doctor.updateOne({ _id: idDoctor, patients: { $ne: idUser } }, { $addToSet: { patients: idUser } });

    return;
}

exports.getOne = (serviceId) => Service.findById(serviceId).populate('owner').populate('signed');

exports.delete = (serviceId) => Service.findByIdAndDelete(serviceId);

exports.edit = (serviceId, newData) => Service.findByIdAndUpdate(serviceId, newData);