import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createHospital } from '../services/hospitalService';

const HospitalForm = () => {
  const [hospital, setHospital] = useState({
    name: '',
    city: '',
    image: '',
    speciality: [],
    rating: 0,
  });

  const handleChange = (e) => {
    if (e.target.name === 'speciality') {
      setHospital({ ...hospital, speciality: Array.from(e.target.selectedOptions, option => option.value) });
    } else {
      setHospital({ ...hospital, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHospital(hospital);
      alert('Hospital created successfully');
      setHospital({ name: '', city: '', image: '', speciality: [], rating: 0 });
    } catch (error) {
      alert('Error creating hospital');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={hospital.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" name="city" value={hospital.city} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="url" name="image" value={hospital.image} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Specialities</Form.Label>
        <Form.Select multiple name="speciality" value={hospital.speciality} onChange={handleChange}>
          <option value="Heart">Heart</option>
          <option value="Ear">Ear</option>
          <option value="Eye">Eye</option>
          <option value="Skin">Skin</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" name="rating" value={hospital.rating} onChange={handleChange} required min="0" max="5" step="0.1" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Hospital
      </Button>
    </Form>
  );
};

export default HospitalForm;