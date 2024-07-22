import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addHospitalDetails } from '../services/hospitalService';

// eslint-disable-next-line react/prop-types
const AddHospitalDetailsForm = ({ hospitalId, onSuccess }) => {
  const [details, setDetails] = useState({
    description: '',
    image: [],
    numberOfDoctors: 0,
    numberOfDepartments: 0
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setDetails({ ...details, image: e.target.value.split(',') });
    } else {
      setDetails({ ...details, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHospitalDetails(hospitalId, details);
      alert('Hospital details added successfully');
      onSuccess();
    } catch (error) {
      alert('Error adding hospital details');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" value={details.description} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Additional Images (comma-separated URLs)</Form.Label>
        <Form.Control type="text" name="image" value={details.image.join(',')} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Number of Doctors</Form.Label>
        <Form.Control type="number" name="numberOfDoctors" value={details.numberOfDoctors} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Number of Departments</Form.Label>
        <Form.Control type="number" name="numberOfDepartments" value={details.numberOfDepartments} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Details
      </Button>
    </Form>
  );
};

export default AddHospitalDetailsForm;