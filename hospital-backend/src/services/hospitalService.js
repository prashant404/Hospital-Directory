const Hospital = require('../models/Hospital');

exports.createHospital = async (hospitalData) => {
  return await Hospital.create(hospitalData);
};

exports.getHospitalsByCity = async (city) => {
  return await Hospital.find({ city: city });
};

exports.deleteHospital = async (id) => {
  return await Hospital.findByIdAndDelete(id);
};

exports.updateHospital = async (id, updateData) => {
  return await Hospital.findByIdAndUpdate(id, updateData, { new: true });
};

exports.addHospitalDetails = async (id, detailsData) => {
  return await Hospital.findByIdAndUpdate(id, detailsData, { new: true });
};