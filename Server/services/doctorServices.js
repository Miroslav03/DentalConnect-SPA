const Doctor = require('../model/Doctor');
const { getErrors } = require('../utils/errors');
const { getDoctorToken } = require('../utils/jwt');


exports.register = async (doctorData) => {
    try {
        const doctor = await Doctor.create(doctorData);
        const doctorToken = await getDoctorToken(doctor);

        return {
            id: doctor._id,
            accessToken: doctorToken,
            username: doctor.username,
            email: doctor.email,
            proficiency: doctor.proficiency,
        }
    } catch (error) {
        getErrors(error);
    }
};

exports.login = async (doctorData) => {
    try {
        const doctor = Doctor.findOne({ email: doctorData.email });

        if (!doctor) {
            throw new Error('Email or password doesn\'t match');
        }

        const isValid = await bcrypt.compare(doctorData.password, doctor.password);

        if (!isValid) {
            throw new Error('Email or password doesn\'t match');
        }

        const doctorToken = getDoctorToken(doctor);

        return {
            id: doctor._id,
            accessToken: doctorToken,
            username: doctor.username,
            email: doctor.email,
        }
    } catch (error) {
        throw new Error('An error occurred during login.');
    }
};

exports.getDoctorById = async (doctorId) => {
    return await Doctor.findById(doctorId).select('-password')
}