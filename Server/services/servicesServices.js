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

exports.buyService = async (idService, idUser) => {
    const service = await this.getOne(idService);
    service.signed.push(idUser);
    return service.save();
}

exports.getOne = (serviceId) => Service.findById(serviceId).populate('owner').populate('signed');

exports.delete = (serviceId) => Service.findByIdAndDelete(serviceId);

exports.edit = (serviceId, newData) => Service.findByIdAndUpdate(serviceId, newData);