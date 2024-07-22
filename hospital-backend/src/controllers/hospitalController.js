const hospitalService = require('../services/hospitalService');
const Hospital = require('../models/Hospital'); 

exports.createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const hospitals = await Hospital.find(city ? { city: city } : {});
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.query;
    const hospital = await Hospital.findByIdAndDelete(id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.query;
    const { rating, image } = req.body;
    
    // Ensure rating is a number
    const updatedRating = parseFloat(rating);

    if (isNaN(updatedRating)) {
      return res.status(400).json({ message: 'Invalid rating value' });
    }

    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { rating: updatedRating, image },
      { new: true, runValidators: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addHospitalDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const { description, image, numberOfDoctors, numberOfDepartments } = req.body;

    const hospital = await Hospital.findByIdAndUpdate(
      id,
      {
        description,
        additionalImages: image,
        numberOfDoctors: parseInt(numberOfDoctors),
        numberOfDepartments: parseInt(numberOfDepartments)
      },
      { new: true, runValidators: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};